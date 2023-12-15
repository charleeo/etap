import {
  DataSource,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { RoomType } from '../entities/room.types.entity';

@Injectable()
export class RoomTypeRepository extends Repository<RoomType> {
  constructor(private dataSource: DataSource) {
    super(RoomType, dataSource.createEntityManager());
  }
}
