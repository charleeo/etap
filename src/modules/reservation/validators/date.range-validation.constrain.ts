import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsDateRangeValid', async: false })
export class IsDateRangeValidConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const checkinTime = new Date(value.expected_checkin_time);
    const checkoutTime = new Date(value.expected_checkout_time);

    return checkoutTime >= checkinTime;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Expected checkout time must be equal to or greater than expected check-in time.';
  }
}
