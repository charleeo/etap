import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('overstay_rates')
export class OverstayRate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 225, unique: true })
  roome_name: string;

  @Column({ type: 'varchar' })
  weekdays_rate: string;

  @Column({ type: 'varchar' })
  weekend_rate: string;
}
