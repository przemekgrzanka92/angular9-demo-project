import ToDo from './to-do.model';
import {ToDoActionTypes, ToDoActionUnion} from './to-do.actions';

export const initialState: ToDo[] = [];

export function ToDoReducer(state = initialState, action: ToDoActionUnion) {
  switch (action.type) {
    case ToDoActionTypes.ADD_TODO:
      return [...state, { ...action.payload }];
    case ToDoActionTypes.UPDATE_TODO:
      const updatedToDo = {...state.find(toDo => toDo.id === action.payload.id), ...action.payload.updatedToDo};
      return [
        updatedToDo,
        ...state.filter(toDo => toDo.id !== action.payload.id)
      ];
    case ToDoActionTypes.REMOVE_TODO:
      return state.filter(toDo => toDo.id !== action.payload.id);
    default:
      return state;
  }
}
