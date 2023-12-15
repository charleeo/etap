import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

import { IsDateRangeValidConstraint } from './date.range-validation.constrain';

export function IsDateRangeValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateRangeValidConstraint,
    });
  };
}
