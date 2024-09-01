import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scButtonPrimary]', standalone: true })
export class ButtonPrimaryDirective {
  @HostBinding('class')
  readonly elementClass =
    'border-2 rounded p-2 text-white outline-none bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed';
}
