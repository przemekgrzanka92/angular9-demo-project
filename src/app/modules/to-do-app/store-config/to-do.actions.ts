import {Action} from '@ngrx/store';
import ToDo from './to-do.model';

export enum ToDoActionTypes {
  ADD_TODO = '[TODO] Add',
  UPDATE_TODO = '[TODO] Update',
  REMOVE_TODO = '[TODO] Remove'
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
}

export class AddTodo implements ActionEx {
  readonly type = ToDoActionTypes.ADD_TODO;
  constructor(public payload: ToDo) {
  }
}

export class UpdateTodo implements ActionEx {
  readonly type = ToDoActionTypes.UPDATE_TODO;
  constructor(public payload: {id: number, updatedToDo: ToDo}) {
  }
}

export class RemoveTodo implements ActionEx {
  readonly type = ToDoActionTypes.REMOVE_TODO;
  constructor(public payload: {id: number}) {
  }
}

export type ToDoActionUnion = AddTodo | UpdateTodo | RemoveTodo;

