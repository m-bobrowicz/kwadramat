import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scTable]', standalone: true })
export class TableDirective {
  @HostBinding('class')
  readonly elementClass = 'w-full border-separate';
}
