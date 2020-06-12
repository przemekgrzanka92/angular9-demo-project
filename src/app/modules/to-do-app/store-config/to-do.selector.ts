import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ToDoState} from './to-do.state';

const toDos = createFeatureSelector('toDos');

export const getToDos = createSelector(
  toDos,
  (state: ToDoState) => state.toDos
);
