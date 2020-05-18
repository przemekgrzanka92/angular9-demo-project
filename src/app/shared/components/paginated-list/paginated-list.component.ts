import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Pagination} from './paginated-list.service';
import {PaginatedListService} from './paginated-list.service';

export interface ListConfigAction {
  actionName: string;
  label: string;
}

export interface ListConfigField {
  fieldName: string;
  label: string;
  type?: string;
}

export interface ListConfig {
  fieldNames: ListConfigField[];
  actions?: ListConfigAction[];
}

@Component({
  selector: 'app-paginated-list',
  templateUrl: './paginated-list.component.html'
})
export class PaginatedListComponent implements OnChanges {

  @Input() allItems: any[] = [];

  @Input() listConfig: ListConfig;

  @Output() listActionChange = new EventEmitter<{actionName: string, item: any}>();

  paginator: Pagination;
  pagedItems: any[] = [];

  constructor(private pagerService: PaginatedListService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.allItems) {
      this.setPage(1);
    }
  }

  setPage(page: number) {
    this.paginator = this.pagerService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.paginator.startIndex, this.paginator.endIndex + 1);
  }

  actionHandler(actionName: string, item: {}) {
    this.listActionChange.emit({actionName, item});
  }

}
