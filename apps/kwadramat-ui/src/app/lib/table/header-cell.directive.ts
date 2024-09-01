import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scHeaderCell]', standalone: true })
export class HeaderCellDirective {
  @HostBinding('class')
  readonly elementClass = 'bg-zinc-800 p-2 border-zinc-600 border-b';
}
