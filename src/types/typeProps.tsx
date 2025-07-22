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
export type TodoType = {
  id: number;
  text: string;
  category: string;
  isCompleted: boolean;
};

export interface TodoFormProps {
  addTodo: (todo: {
    value: string;
    category: string;
    isCompleted?: boolean;
  }) => Promise<void>;
}
