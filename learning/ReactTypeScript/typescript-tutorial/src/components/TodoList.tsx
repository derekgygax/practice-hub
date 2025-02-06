import "./styles.css";

import { ITodo } from "./models/todo"
import { Todo } from "./Todo";
import { TodoReducerAction } from "./reducers/TodoReducer";
import { DroppableContainer } from "./DroppableContainer";

interface TodoListProps {
  DRAG_CONTAINER_IDS: {
    todo: string;
    complete: string;
  }
  todos: ITodo[];
  todosDispatch: React.Dispatch<TodoReducerAction>;
  completedTodos: ITodo[];
  completedTodosDispatch: React.Dispatch<TodoReducerAction>;
}

export const TodoList = ({ DRAG_CONTAINER_IDS, todos, todosDispatch, completedTodos, completedTodosDispatch }: TodoListProps) => {
  return (
    <div className="container">
      <DroppableContainer id={DRAG_CONTAINER_IDS.todo} className="todos">
        <span className="todos__heading">
          Active Tasks
        </span>
        {todos.map((todo: ITodo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              // Idk if I like doing it this way
              // I don't want to ship everything down there
              // it should be handled at a higher level I think
              dispatch={todosDispatch}
            />
          )
        })}
      </DroppableContainer>
      <DroppableContainer id={DRAG_CONTAINER_IDS.complete} className="todos remove">
        <span className="todos__heading">
          Completed Tasks
        </span>
        {completedTodos.map((todo: ITodo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              // Idk if I like doing it this way
              // I don't want to ship everything down there
              // it should be handled at a higher level I think
              dispatch={completedTodosDispatch}
            />
          )
        })}
      </DroppableContainer>
    </div>
  )
}
