import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scHeaderRow]', standalone: true })
export class HeaderRowDirective {
  @HostBinding('class')
  readonly elementClass = '';
}
