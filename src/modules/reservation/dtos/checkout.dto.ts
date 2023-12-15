import {
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CheckoutDto {
  @IsDateString()
  @IsNotEmpty()
  public actual_checkout_time: Date;

  @IsNotEmpty()
  reservation_id: any;
}
