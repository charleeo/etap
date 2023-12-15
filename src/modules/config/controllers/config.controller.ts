import {
  Controller,
  Get,
} from '@nestjs/common';

import { ConfigService } from '../services/config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async create(): Promise<any> {
    return this.configService.create();
  }
}
