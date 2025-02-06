
import "./styles.css";
import { useRef, useState } from "react";
import { TodoReducerAction } from "./reducers/TodoReducer";

interface InputFieldProps {
  // todo: string;
  // // this type was found from hovering over in the previous screen
  // setTodo: React.Dispatch<React.SetStateAction<string>>;
  // handleAddTodo: (e: React.FormEvent) => void;
  todosDispatch: React.Dispatch<TodoReducerAction>;
}

export const InputField = ({ todosDispatch }: InputFieldProps) => {

  const [todo, setTodo] = useState<string>("");
  // useRef is like document.getElementByClassName and that shit
  // pay attention in the tutorial because when getting the type he will
  // tell you how but with how you get it he will say, there is a bunch of
  // crap written which no one understands. he is funny dude
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className='input' onSubmit={(e) => {
      e.preventDefault();
      todosDispatch({
        type: "addNew",
        payload: todo
      });
      setTodo("");
      // handleAddTodo(e);
      // the ? is to handle if the inputRef does OR does NOT exist
      inputRef.current?.blur();
    }}>
      <input
        ref={inputRef}
        type='input'
        placeholder='enter a task'
        className="input__box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit" type='submit'>
        Go
      </button>
    </form >
  )
}
