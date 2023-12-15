import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { RoomTypeEnum } from 'src/data-types/room.enums';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsEnum(RoomTypeEnum)
  public room_type: RoomTypeEnum;

  @IsDateString()
  @IsNotEmpty()
  public expected_checkin_time: Date;

  @IsDateString()
  @IsNotEmpty()
  //   @IsDateRangeValid()
  public expected_checkout_time: Date;

  @IsOptional()
  status: string;

  @IsNotEmpty()
  customer_id: any;
}
