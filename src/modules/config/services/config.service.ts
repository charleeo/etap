import { logErrors } from 'src/config/helpers/logging';
import { response } from 'src/config/helpers/reponse';

import { Injectable } from '@nestjs/common';

import overstayRates from '../../../storage/data/overstay_rates.json';
import roomTypes from '../../../storage/data/room_types.json';
import {
  OverstayRateRepository,
} from '../repositories/overstay.rates.repository';
import { RoomTypeRepository } from '../repositories/room.type.repository';

@Injectable()
export class ConfigService {
  constructor(
    private roomtypeRepository: RoomTypeRepository,
    private overstayRateRepository: OverstayRateRepository,
  ) {}

  async create(): Promise<any> {
    let error: string;
    let message: string;
    const responseData: object = {};
    let status: boolean;
    try {
      roomTypes.map(async (roomType) => {
        responseData['room_type'] = 'Room types created';
        await this.roomtypeRepository.upsert(
          { name: roomType.name, rate: roomType.rate },
          ['name'],
        );
      });

      overstayRates.map(async (rate) => {
        responseData['ovestay'] = 'Overstay rates created';
        await this.overstayRateRepository.upsert(
          {
            roome_name: rate.name,
            weekdays_rate: rate.weekdays_percentage_increase,
            weekend_rate: rate.weekend_percentage_increase,
          },
          ['roome_name'],
        );
      });
      status = true;
      message = 'Config data created';
    } catch (e) {
      logErrors(e);
      error = e.message;
      status = false;
    }
    return response(status, error ?? message, responseData);
  }
}
