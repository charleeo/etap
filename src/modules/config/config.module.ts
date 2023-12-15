import { Module } from '@nestjs/common';

import { ConfigController } from './controllers/config.controller';
import {
  OverstayRateRepository,
} from './repositories/overstay.rates.repository';
import { RoomTypeRepository } from './repositories/room.type.repository';
import { ConfigService } from './services/config.service';

@Module({
  providers: [ConfigService, RoomTypeRepository, OverstayRateRepository],
  controllers: [ConfigController],
})
export class ConfigModule {}
