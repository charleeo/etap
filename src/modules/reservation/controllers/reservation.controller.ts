import { Response } from 'express';

import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';

import { CheckoutDto } from '../dtos/checkout.dto';
import { CreateReservationDto } from '../dtos/create.reservation.dto';
import { ReservationService } from '../servcies/reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post('book')
  async book(
    @Body() reservation: CreateReservationDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.reservationService.bookReservation(reservation, res);
  }

  @Post('checkout')
  async checkout(
    @Body() checkoutDto: CheckoutDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.reservationService.checkout(checkoutDto, res);
  }
}
