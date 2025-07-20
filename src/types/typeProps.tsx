export interface TaskProps {
  todoList: {
    id: number;
    text: string;
    category: string;
    isCompleted: boolean;
  };
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
}
