import fs from 'fs/promises';
import path, { sep } from 'path';

export const SUNDAY = 'Sunday';
export const SATURDAY = 'Saturday';
export const FRIDAY = 'Friday';

export function generateReference(code?: string): string {
  const date = new Date();
  const time = date.setTime(date.getTime()).toString();

  return `${code ?? 'APP_CODE_'}${time}`;
}

export function Classes(bases) {
  class Bases {
    constructor() {
      bases.forEach((base) => Object.assign(this, new base()));
    }
  }
  bases.forEach((base) => {
    Object.getOwnPropertyNames(base.prototype)
      .filter((prop) => prop !== 'contructor')
      .forEach((prop) => (Bases.prototype[prop] = base.prototype[prop]));
  });
  return Bases;
}

/**
 * this will return a string message corresponding to the code pass to it
@param {} code the response code to passed
* @returns {string}
*/
export async function setExceptionFilters(exception) {
  let message = '';
  let exceptions = await fs.readFile(
    path.join(`.${sep}src${sep}storage${sep}data${sep}exceptions.json`),
    'utf-8',
  );
  exceptions = JSON.parse(exceptions);
  console.log(exceptions.hasOwnProperty(exception));

  if (exceptions.hasOwnProperty(exception)) {
    message = exceptions[exception];
  }
  return message;
}

export function calculateTotalHoursSpent(checkInDate, checkOutdate) {
  const timeDifference = Math.abs(checkOutdate - checkInDate);

  const hoursDifference =
    timeDifference / (1000 * 60 * 60) + (checkOutdate.getMinutes() > 0 ? 1 : 0);
  const roundedHours = Math.floor(hoursDifference);

  return roundedHours;
}

/**
 * compare two date to know whcich is greater and return a boolean
 * @param checkInDate
 * @param checkOutdate
 * @returns boolean
 */
export function isDateGreater(checkInDate: Date, checkOutdate: Date): boolean {
  // Convert dates to timestamps for comparison
  const checkInTimeStamp = checkInDate.getTime();
  const checkOutTimeStamp = checkOutdate.getTime();
  // Compare timestamps
  return checkInTimeStamp > checkOutTimeStamp;
}

export function generateSerialNumber(value: number): string {
  const paddedSerialNumber = value.toString().padStart(7, '0');
  return paddedSerialNumber;
}

export function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function countWeekendHours(startDate: Date, endDate: Date): number {
  const currentDateTime = new Date(startDate);
  let weekendHours = 0;

  while (currentDateTime <= endDate) {
    const dayOfWeek = currentDateTime.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
      weekendHours++;
    }

    currentDateTime.setTime(currentDateTime.getTime() + 3600000); // Move to the next hour
  }

  return weekendHours;
}
