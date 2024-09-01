import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scCell]', standalone: true })
export class CellDirective {
  @HostBinding('class')
  readonly elementClass = 'bg-zinc-800 p-2 border-zinc-600 border-b';
}
