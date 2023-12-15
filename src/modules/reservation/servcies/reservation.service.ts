import { Response } from 'express';
import { BaseRepository } from 'src/config/helpers/base.repository';
import {
  calculateTotalHoursSpent,
  countWeekendHours,
  generateSerialNumber,
  isDateGreater,
  isWeekend,
} from 'src/config/helpers/general.helper.functions';
import { response as responseStructure } from 'src/config/helpers/reponse';
import { OverstayRateRepository } from 'src/modules/config/repositories/overstay.rates.repository';
import { RoomTypeRepository } from 'src/modules/config/repositories/room.type.repository';

import { Body, HttpStatus, Injectable, Res } from '@nestjs/common';

import { CheckoutDto } from '../dtos/checkout.dto';
import { CreateReservationDto } from '../dtos/create.reservation.dto';
import { Reservation } from '../entities/reservation.entity';
import { ReservationRepository } from '../repositories/reservation.repository';

@Injectable()
export class ReservationService extends BaseRepository {
  constructor(
    private reservationRepository: ReservationRepository,
    private roomTypeRepository: RoomTypeRepository,
    private overstayRepository: OverstayRateRepository,
  ) {
    super(reservationRepository);
  }

  async bookReservation(
    @Body() reservationDto: CreateReservationDto,
    @Res() response: Response,
  ): Promise<any> {
    let status = false;
    let statusCode: HttpStatus;
    let message = '';
    let responseData = null;
    const room_type = reservationDto.room_type;
    const checkinTime = new Date(reservationDto.expected_checkin_time);
    const checkoutTime = new Date(reservationDto.expected_checkout_time);

    //Make sure the checkout date is greater the checkin time
    if (isDateGreater(checkinTime, checkoutTime)) {
      message =
        'expected checkin date can not be greated than expected checkout dte';
      statusCode = HttpStatus.BAD_REQUEST;
      return response
        .status(statusCode)
        .send(responseStructure(status, message, responseData, statusCode));
    }

    const totalHours = calculateTotalHoursSpent(checkinTime, checkoutTime);

    //Get the amount to paid for the checkin an checkout duration using the room type selected
    const roomTypeDetails = await this.roomTypeRepository.findOneBy({
      name: room_type,
    });

    const reservationCost: number = parseFloat(
      Number(totalHours * roomTypeDetails.rate).toFixed(2),
    );
    const createReservationObject = {
      expected_checkin_time: checkinTime,
      expected_checkout_time: checkoutTime,
      rate_per_hour: reservationCost,
      room_type,
      customer_id: reservationDto.customer_id,
    };
    if (reservationDto.status) {
      createReservationObject['status'] = reservationDto.status;
    }

    const reservation = await this.reservationRepository.save(
      createReservationObject,
    );

    if (reservation) {
      // typeorm hooks is return null for id on @beforeInsert() hook. I will look into that later
      await this.reservationRepository.update(
        { id: reservation.id },
        {
          reservation_id: generateSerialNumber(reservation.id),
        },
      );
      responseData = reservation;
      message = 'Reservation booked';
      status = true;
      statusCode = HttpStatus.CREATED;
    }

    return response
      .status(statusCode)
      .send(responseStructure(status, message, responseData, statusCode));
  }

  async checkout(
    @Body() checkotDto: CheckoutDto,
    @Res() response: Response,
  ): Promise<any> {
    let status = false;
    let statusCode: HttpStatus;
    let message = '';
    let responseData = null;

    const reservation: Partial<Reservation> =
      await this.reservationRepository.findOneByOrFail({
        reservation_id: checkotDto.reservation_id,
      });

    const room_type = reservation.room_type;
    const actualCheckoutTime = new Date(checkotDto.actual_checkout_time);
    const expectedCheckoutTime = new Date(reservation.expected_checkout_time);

    const totalHours = calculateTotalHoursSpent(
      expectedCheckoutTime,
      actualCheckoutTime,
    );

    //Get the amount to paid for the checkin an checkout duration using the room type selected
    const roomTypeDetails = await this.roomTypeRepository.findOneBy({
      name: room_type,
    });
    const rates = parseFloat(Number(roomTypeDetails.rate).toFixed(2));

    const overstayPercentIncrease = await this.overstayRepository.findOneBy({
      roome_name: room_type,
    });

    const weekend_rate: number = parseFloat(
      overstayPercentIncrease.weekend_rate,
    );
    const weekdays_rate: number = parseFloat(
      overstayPercentIncrease.weekdays_rate,
    );

    let weekendHours = 0;
    let weekendOverstayCharges = 0;

    if (isWeekend(actualCheckoutTime)) {
      weekendHours = countWeekendHours(
        expectedCheckoutTime,
        actualCheckoutTime,
      );
      const weekendPercentageIncrease = rates + (weekend_rate * rates) / 100;

      weekendOverstayCharges = weekendPercentageIncrease * weekendHours;
    }

    const weekdaysHours = totalHours - weekendHours;
    const weekdayPercentageIncrease = rates + (weekdays_rate * rates) / 100;
    const weekdayOverstayCharges = weekdayPercentageIncrease * weekdaysHours;

    const overstayCharges: number = parseFloat(
      Number(weekdayOverstayCharges + weekendOverstayCharges).toFixed(2),
    );

    if (reservation) {
      await this.reservationRepository.update(
        { id: reservation.id },
        {
          overstay_price: overstayCharges,
          actual_checkout_time: actualCheckoutTime,
        },
      );

      const checkoutDetails: Partial<Reservation> =
        await this.reservationRepository.findOneByOrFail({
          reservation_id: checkotDto.reservation_id,
        });

      responseData = checkoutDetails;
      message = 'Reservation checked out';
      status = true;
      statusCode = HttpStatus.OK;
    }

    return response
      .status(statusCode)
      .send(responseStructure(status, message, responseData, statusCode));
  }
}
