import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  totalTask: number;
  totaltaskcompleted: number;
  totaltaskpending: number;
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      totalTask: 0,
      totaltaskcompleted: 0,
      totaltaskpending: 0,

      addTodo: (text) =>
        set((state) => {
          // 1. Get the updated todos array
          const newTodos = [
            ...state.todos,
            { id: Math.random().toString(), text, completed: false },
          ];

          // 2. Initialize our counters
          let completedCount = 0;
          let pendingCount = 0;

          // 3. Loop through the array to calculate completed and pending tasks
          newTodos.forEach((todo) => {
            if (todo.completed) {
              completedCount += 1;
            } else {
              pendingCount += 1;
            }
          });

          return {
            todos: newTodos,
            totalTask: newTodos.length, // Finding length
            totaltaskcompleted: completedCount,
            totaltaskpending: pendingCount,
          };
        }),

      deleteTodo: (id) =>
        set((state) => {
          // 1. Get the updated todos array
          const newTodos = state.todos.filter((todo) => todo.id !== id);

          // 2. Initialize our counters
          let completedCount = 0;
          let pendingCount = 0;

          // 3. Loop through the array to calculate completed and pending tasks
          newTodos.forEach((todo) => {
            if (todo.completed) {
              completedCount += 1;
            } else {
              pendingCount += 1;
            }
          });

          return {
            todos: newTodos,
            totalTask: newTodos.length, // Finding length
            totaltaskcompleted: completedCount,
            totaltaskpending: pendingCount,
          };
        }),

      toggleTodo: (id) =>
        set((state) => {
          // 1. Get the updated todos array
          const newTodos = state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          );

          // 2. Initialize our counters
          let completedCount = 0;
          let pendingCount = 0;

          // 3. Loop through the array to calculate completed and pending tasks
          newTodos.forEach((todo) => {
            if (todo.completed) {
              completedCount += 1;
            } else {
              pendingCount += 1;
            }
          });

          return {
            todos: newTodos,
            totalTask: newTodos.length, // Finding length
            totaltaskcompleted: completedCount,
            totaltaskpending: pendingCount,
          };
        }),
    }),
    {
      name: 'todo-storage',
    }
  )
)
