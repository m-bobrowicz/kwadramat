import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FeatherModule } from 'angular-feather';
import { ButtonLinkDirective } from '../button/button-link.directive';

@Component({
  selector: 'sc-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, FeatherModule, ButtonLinkDirective],
})
export class PaginatorComponent {
  @Input() currentPage = 1;
  @Input() limit = 10;
  @Input() totalSize = 0;
  @Output() pageChange = new EventEmitter<{ page: number }>();

  get pageStart() {
    return (this.currentPage - 1) * this.limit + 1;
  }

  get pageEnd() {
    return Math.min(this.currentPage * this.limit, this.totalSize);
  }

  get hasPreviousPage() {
    return this.currentPage > 1;
  }

  get hasNextPage() {
    return this.currentPage < Math.ceil(this.totalSize / this.limit);
  }
}
