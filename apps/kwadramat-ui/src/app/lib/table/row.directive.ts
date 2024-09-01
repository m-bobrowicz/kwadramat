import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scRow]', standalone: true })
export class RowDirective {
  @HostBinding('class')
  readonly elementClass = '';
}
