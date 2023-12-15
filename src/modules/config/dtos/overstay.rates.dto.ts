import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class OverstayRateDto {
  @IsNumber()
  public id: number;

  @IsNotEmpty()
  public room_name: string;

  @IsNotEmpty()
  public weekend_rate_percentage_increase: string;
  @IsNotEmpty()
  public weekdays_rate_percentage_increase: string;
}
