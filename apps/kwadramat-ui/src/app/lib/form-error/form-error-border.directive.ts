import { Directive, HostBinding, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[scFormErrorBorder]', standalone: true })
export class FormErrorBorderDirective {
  @HostBinding('class.!border-red-500')
  get hasBorder() {
    return this.control?.touched && this.control?.invalid;
  }

  constructor(@Optional() private control: NgControl) {}
}
