import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 225 })
  room_type: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'make this column nullable so that BeforeInsert hook will work',
  })
  reservation_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'make this column nullable so that BeforeInsert hook will work',
  })
  customer_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rate_per_hour: number;

  @Column({
    type: 'decimal',
    nullable: true,
    default: 0.0,
    precision: 10,
    scale: 2,
    comment: 'make it a nullable column incase there is no overstay',
  })
  overstay_price: number;

  @Column({ type: 'varchar', default: 'paid' })
  status: string;

  @Column({ type: 'timestamp' })
  expected_checkin_time: Date;

  @Column({ type: 'timestamp' })
  expected_checkout_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  actual_checkout_time: Date;
}
