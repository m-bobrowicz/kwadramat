import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scMenuItem]', standalone: true })
export class MenuItemDirective {
  @HostBinding('class')
  readonly elementClass =
    'flex items-center flex-row flex-1 font-semibold pr-7 pb-2 pt-2 pl-2 hover:bg-zinc-600 text-sm';
}
