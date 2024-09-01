import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scInput]', standalone: true })
export class InputDirective {
  @HostBinding('class')
  readonly elementClass =
    'border-2 border-zinc-600 bg-transparent rounded p-2 focus:border-indigo-700 outline-none';
}
