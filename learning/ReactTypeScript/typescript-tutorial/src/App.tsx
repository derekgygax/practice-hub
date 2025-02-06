import './App.css'

let name: string;
let age: number;
let isStudent: boolean;
let hobbies: string[];
let role: [number, string];

// no
// role = [5,5];
// yes
role = [5, "sds"];

type Person = {
  name: string;
  age?: number | string;
}

let person: Person = {
  name: "hye",
  age: 2
};

let people: Person[] = [
  {
    name: "ss"
  },
  {
    name: "rrrr",
    age: 44
  }
]

// assign type of function
// void returns undefined
// never doesn't return anything
type PrintName = (name: string) => void;
type PrintNameTwo = (name: string) => never;

const printName: PrintName = (name) => {
  console.log(name);
}

printName(person.name);

// this could be the any type
// any is NOT recommended
let personName: unknown;

function App() {
  return (
    <>
      <div>
        hello
      </div>
    </>
  )
}

export default App
