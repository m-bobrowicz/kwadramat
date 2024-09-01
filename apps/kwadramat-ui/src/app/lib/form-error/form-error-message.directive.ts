import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input,
  SkipSelf,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';

@Directive({ selector: '[scFormErrorMessage]', standalone: true })
export class FormErrorDirective {
  @HostBinding('class.hidden')
  get isHidden() {
    const isVisible = (() => {
      if (this.checkFor == null) {
        return this.control?.touched && this.control?.invalid;
      }
      return this.control?.touched && this.control?.hasError(this.checkFor);
    })();
    return !isVisible;
  }

  @HostBinding('class.text-red-500')
  textClass = true;

  _control: AbstractControl | null = null;
  get control() {
    return this._control;
  }
  @Input('scFormErrorMessage') set control(_control: AbstractControl | null) {
    this._control = _control;
    this._control?.statusChanges
      .pipe(
        tap(() => {
          this.cdr.detectChanges();
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  @Input('scFormErrorMessageCheckFor') checkFor: string | null = null;

  constructor(@SkipSelf() private cdr: ChangeDetectorRef) {}
}
