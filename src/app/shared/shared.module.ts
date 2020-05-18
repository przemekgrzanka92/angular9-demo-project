import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatedListComponent} from './components/paginated-list/paginated-list.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PaginatedListCellPipe} from './components/paginated-list/paginated-list-cell.pipe';

@NgModule({
  declarations: [
    PaginatedListComponent,
    PaginatedListCellPipe
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    PaginatedListComponent
  ]
})
export class SharedModule {
}
