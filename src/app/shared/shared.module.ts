import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatedListComponent} from './components/paginated-list/paginated-list.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    PaginatedListComponent
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
