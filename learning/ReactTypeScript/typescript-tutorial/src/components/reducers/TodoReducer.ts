import { ITodo } from "../models/todo"

export type TodoReducerAction = {
  type: "addNew"; payload: string;
} | {
  type: "add"; payload: ITodo
} | {
  type: "remove"; payload: number;
} | {
  type: "done"; payload: number
} | {
  type: "edit"; payload: { id: number; todo: string }
}

export const TodoReducer = (state: ITodo[], action: TodoReducerAction): ITodo[] => {
  switch (action.type) {
    case "addNew":
      return [
        ...state,
        {
          id: Date.now(),
          todo: action.payload,
          isDone: false
        }
      ];
    case "add":
      return [
        ...state,
        action.payload
      ]
    case "edit":
      return state.map((todo: ITodo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            todo: action.payload.todo
          }
        } else {
          return todo;
        }
      });
    case "remove":
      return state.filter((todo: ITodo) => {
        return todo.id !== action.payload
      });
    case "done":
      return state.map((todo: ITodo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            isDone: true
          }
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
}