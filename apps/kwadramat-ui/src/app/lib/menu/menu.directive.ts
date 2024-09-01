import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scMenu]', standalone: true })
export class MenuDirective {
  @HostBinding('class')
  readonly elementClass =
    'flex flex-col inline-flex overflow-hidden rounded-lg mt-2 shadow-md shadow-zinc-800 bg-zinc-700 ';
}
