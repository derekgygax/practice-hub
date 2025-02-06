import { useReducer } from 'react';
import './App.css'
import { InputField } from './components/InputField';
// import { ITodo } from './components/models/todo';
import { TodoList } from './components/TodoList';
import { TodoReducer } from './components/reducers/TodoReducer';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { ITodo } from './components/models/todo';


// Drag and Drop!!! use the following
// dnd-kit/SOMETHIGN?

// DROPPABLE the tutorial is old so we are just asking ChatGPT and doing it
// lets see if it works

// This is obviously a shitty way to handle this
// BUT you are just doing a quick tutorial and not making this
// clean or good.
// Somone in the future can figure that shit out and make it better
const DRAG_CONTAINER_IDS = {
  todo: "todo",
  complete: "complete"
}

// There is a lot of STUPID shit going on in this app
// but it is pretty much working as intended adn i got other shit to learn
// so GREAT tutorial but gotta move on
// use it for what it is, it NEEDS a lot of improvement

export const App = () => {
  // set the type for the useState
  // const [todo, setTodo] = useState<string>("");
  // USE REDUCER
  // const [todos, setTodos] = useState<ITodo[]>([]);

  // Careful with this
  // This was my guess work on how to implement it correctly
  // with help from ChatGPT. I did NOT look at a class on the right way
  // especially adding the edit piece
  const [todos, todosDispatch] = useReducer(TodoReducer, []);
  const [completedTodos, completedTodosDispatch] = useReducer(TodoReducer, []);

  // const handleAddTodo = (e: React.FormEvent) => {
  //   // this prevents the page refresh from the from submit in InputField.tsx
  //   e.preventDefault();

  //   setTodos({
  //     type: "add",
  //     payload: todo
  //   });
  //   setTodo("");

  //   // USE REDUCER
  //   // if (todo) {
  //   //   // This works following immutability of a react state but i HATE it
  //   //   // look at the other way
  //   //   // setTodos([
  //   //   //   ...todos,
  //   //   //   {
  //   //   //     id: Date.now(),
  //   //   //     todo: todo,
  //   //   //     isDone: false
  //   //   //   }
  //   //   // ]);
  //   //   // This is grabbing what the prevState is at that moment
  //   //   // and then making a copy of it with ...prevState and then adding
  //   //   // to the copy and then setting what that value is
  //   //   // This makes sure you set the whole todos and maintains immutability
  //   //   // you do NOT modify the variable todos, you set it
  //   //   setTodos((prevState) => {
  //   //     return [
  //   //       ...prevState,
  //   //       {
  //   //         id: Date.now(),
  //   //         todo: todo,
  //   //         isDone: false
  //   //       }
  //   //     ]
  //   //   });
  //   //   // After you have used todo then make the state empty
  //   //   setTodo("");
  //   //   // This whole way of doing it feels dirty but for the tutorial go with it
  //   // }
  // }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id;

    if (overId === DRAG_CONTAINER_IDS.complete && todos.some((todo) => todo.id === activeId)) {
      // Move from Active → Completed
      todosDispatch({
        type: "remove",
        payload: activeId
      });
      completedTodosDispatch({
        type: "add",
        payload: todos.find((t) => {
          return t.id === activeId
        }) as ITodo
      });
    } else if (overId === DRAG_CONTAINER_IDS.todo && completedTodos.some((todo) => todo.id === activeId)) {
      // Move from Completed → Active
      completedTodosDispatch({
        type: "remove",
        payload: activeId
      });
      todosDispatch({
        type: "add",
        payload: completedTodos.find((t) => {
          return t.id === activeId
        }) as ITodo
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField
          // todo={todo}
          // setTodo={setTodo}
          // handleAddTodo={handleAddTodo}
          todosDispatch={todosDispatch}
        />
        <TodoList
          DRAG_CONTAINER_IDS={DRAG_CONTAINER_IDS}
          todos={todos}
          todosDispatch={todosDispatch}
          completedTodos={completedTodos}
          completedTodosDispatch={completedTodosDispatch}
        />
      </div>
    </DndContext>
  )
}

// DEFINING TYPES
// let name: string;
// let age: number;
// let isStudent: boolean;
// let hobbies: string[];
// let role: [number, string];

// // no
// // role = [5,5];
// // yes
// role = [5, "sds"];

// type Person = {
//   name: string;
//   age?: number | string;
// }

// let person: Person = {
//   name: "hye",
//   age: 2
// };

// let people: Person[] = [
//   {
//     name: "ss"
//   },
//   {
//     name: "rrrr",
//     age: 44
//   }
// ]

// // assign type of function
// // void returns undefined
// // never doesn't return anything
// type PrintName = (name: string) => void;
// type PrintNameTwo = (name: string) => never;

// const printName: PrintName = (name) => {
//   console.log(name);
// }

// printName(person.name);

// // this could be the any type
// // any is NOT recommended
// let personName: unknown;






// /**
//  * 
//  */
// interface Animal {
//   name: string;
//   age: number;
// }

// interface Guy extends Animal {
//   pro: string
// }

// let derek: Guy = {
//   name: "derek",
//   age: 8,
//   pro: "Ya"
// }

// type X = {
//   a: string;
//   b: number;
// }
// // this is like extends
// type Y = X & {
//   c: string
// }

// let y: Y = {
//   a: "ss",
//   b: 5,
//   c: "eee",
//   // d: "asd" NO WORK!
// };

// // also can do
// type GGG = Guy & {
//   an: string;
// }

// // also can do
// interface EEE extends Y {
//   r: string;
// }
// let ttt: EEE = {
//   a: "dere",
//   b: 4,
//   c: "ss",
//   r: "ddd"
// }
