import { Pipe, PipeTransform } from '@angular/core';
import { formatISO9075 } from 'date-fns';

@Pipe({ name: 'scDateFormat', standalone: true })
export class DateFormatPipe implements PipeTransform {
  transform(value: string | null, ...args: any[]): any {
    if (value == null) {
      return '';
    }
    return formatISO9075(new Date(value));
  }
}
