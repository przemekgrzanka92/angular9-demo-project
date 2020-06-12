import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToDoListComponent} from './components/to-do-list/to-do-list.component';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {ToDoState} from './store-config/to-do.state';
import {ToDoReducer} from './store-config/to-do.reducer';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const toDoReducer: ActionReducerMap<ToDoState> = {
  toDos: ToDoReducer
};

const routes: Routes = [
  {path: '', component: ToDoListComponent}
];


@NgModule({
  declarations: [ToDoListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('toDos', toDoReducer),
    RouterModule.forChild(routes),
  ]
})
export class ToToModule {
}
