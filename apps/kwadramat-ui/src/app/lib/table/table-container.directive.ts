import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scTableContainer]', standalone: true })
export class TableContainerDirective {
  @HostBinding('class')
  readonly elementClass =
    'h-full overflow-auto bg-zinc-800  border-zinc-600 border rounded-md';
}
