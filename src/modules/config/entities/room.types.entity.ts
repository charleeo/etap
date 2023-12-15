import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('room_types')
export class RoomType {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 225, unique: true })
  name: string;

  @Column({ type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  rate: number;
}
