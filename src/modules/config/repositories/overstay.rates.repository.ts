import {
  DataSource,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { OverstayRate } from '../entities/overstay.rates.entity';

@Injectable()
export class OverstayRateRepository extends Repository<OverstayRate> {
  constructor(private dataSource: DataSource) {
    super(OverstayRate, dataSource.createEntityManager());
  }
}
