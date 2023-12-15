import { Module } from '@nestjs/common';

import {
  OverstayRateRepository,
} from '../config/repositories/overstay.rates.repository';
import {
  RoomTypeRepository,
} from '../config/repositories/room.type.repository';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationRepository } from './repositories/reservation.repository';
import { ReservationService } from './servcies/reservation.service';

@Module({
  providers: [
    ReservationService,
    ReservationRepository,
    RoomTypeRepository,
    OverstayRateRepository,
  ],
  controllers: [ReservationController],
})
export class ReservationModule {}
