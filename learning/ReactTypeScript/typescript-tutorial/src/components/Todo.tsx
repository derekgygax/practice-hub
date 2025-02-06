import { ITodo } from "./models/todo";

import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from "react-icons/md";

import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { TodoReducerAction } from "./reducers/TodoReducer";
import { useDraggable } from "@dnd-kit/core";

// uses React Icons
// https://react-icons.github.io/react-icons/

interface TodoProps {
  todo: ITodo;
  dispatch: React.Dispatch<TodoReducerAction>;
}

// Idk if I like doing it this way
// I don't want to ship everything down there
// it should be handled at a higher level I think
export const Todo = ({ todo, dispatch }: TodoProps) => {


  // to edit the text
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: todo.id,
  });

  const handleDone = (id: number) => {
    dispatch({
      type: "done",
      payload: id
    })
    // setTodos((prevTodos) => {
    //   return prevTodos.map((todo: ITodo) => {
    //     // NEVER allowed to directly manipulate
    //     // ALWAYS make a new copy
    //     // Remember in here that you NEED to follow immutability rules
    //     // so you can NOT be like todo = {...todo, isDone: true}
    //     // that is directly mutating a todo
    //     // You NEED to do that extender in HERE
    //     // even though its inside of the todos
    //     // you can NOT manipualte it directly
    //     if (todo.id === id) {
    //       return {
    //         ...todo,
    //         isDone: !todo.isDone
    //       }
    //     } else {
    //       // do NOT spread this because it will cause rerenders
    //       // that should NOT happen
    //       return todo;
    //     }
    //   });
    // });
  }

  const handleDelete = (id: number) => {
    dispatch({
      type: "remove",
      payload: id
    });
    // setTodos((prevTodos) => {
    //   return prevTodos.filter((todo: ITodo) => {
    //     return todo.id !== id;
    //   })
    // });
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch({
      type: "edit",
      payload: {
        id: id,
        todo: editTodo
      }
    })

    // setTodos((prevTodos) => {
    //   return prevTodos.map((todo: ITodo) => {
    //     if (todo.id === id) {
    //       return {
    //         ...todo,
    //         todo: editTodo
    //       }
    //     } else {
    //       return todo;
    //     }
    //   });
    // });
    setEdit(false);
  }

  useEffect(() => {
    // Mabye don't need this if part and just always do it ...
    if (edit) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [edit]);

  return (
    <form
      ref={!edit ? setNodeRef : undefined} // Disable drag when editing
      {...(!edit ? listeners : {})} // Disable dragging when editing
      {...(!edit ? attributes : {})} // Disable dragging when editing
      className="todos__single"
      onSubmit={(e) => {
        handleEdit(e, todo.id)
      }}
    >
      {
        edit ? (
          <input
            ref={inputRef}
            className="todos__single--text"
            value={editTodo}
            onChange={(e) => {
              setEditTodo(e.target.value);
            }}
          />
        ) : (
          todo.isDone ? (
            // This is a strike tag
            // <s></s>
            <s className="todos__single--text">
              {todo.todo}
            </s>
          ) : (
            <span className="todos__single--text">
              {todo.todo}
            </span>
          )
        )
      }
      <div>
        {/* 
        if you type the below and push enter it will build the component thing
        span.icon 
        <span className="icon">
        */}
        <span
          className="icon"
          onPointerDownCapture={(e) => e.stopPropagation()}
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span
          className="icon"
          onPointerDownCapture={(e) => e.stopPropagation()}
          onClick={() => {
            handleDelete(todo.id);
          }}
        >
          <AiFillDelete />
        </span>
        <span
          className="icon"
          onPointerDownCapture={(e) => e.stopPropagation()}
          onClick={() => {
            handleDone(todo.id);
          }}
        >
          <MdDone />
        </span>
      </div>
    </form >
  );
}
