import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'sc-indeterminate-progress-bar',
  templateUrl: './indeterminate-progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class IndeterminateProgressBarComponent {
  @HostBinding('class')
  @Input()
  elementClass = 'block relative';
}
