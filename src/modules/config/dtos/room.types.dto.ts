import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class RoomTypeDto {
  @IsNumber()
  public id: number;

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public rate: number;
}
