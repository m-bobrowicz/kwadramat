import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { AppService } from './app.service';
import { IndeterminateProgressBarComponent } from './lib/indeterminate-progress-bar/indeterminate-progress-bar.component';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, IndeterminateProgressBarComponent, RouterOutlet],
})
export class AppComponent {
  appService = inject(AppService);
  isNotLoading$ = this.appService.isLoading$.pipe(
    map((isLoading) => isLoading === false)
  );
}
