// Most Suggested Naming for Types and Interfaces
// | Concept  | Best Naming Convention | Alternative (Less Common) |
// |-----------|------------------------|--------------------------|
// | Type      | TodoType               | `TTodo` (Less readable)   |
// | Interface | ITodo                  | `TodoInterface` (Too long), `TodoModel` (If it's a backend model) |

export interface ITodo {
  id: number,
  todo: string;
  isDone: boolean;
}