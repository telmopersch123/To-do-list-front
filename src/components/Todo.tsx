import type { TaskProps } from "../types/typeProps";

const Todo = ({ todoList, removeTodo, completeTodo }: TaskProps) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todoList.isCompleted ? "line-through" : "" }}
    >
      <div className="content">
        <p className="text">{todoList.text}</p>
        <p className="category">({todoList.category})</p>
      </div>
      <div className="actions">
        <button onClick={() => completeTodo(todoList.id)} className="edit">
          Completar
        </button>
        <button onClick={() => removeTodo(todoList.id)} className="remove">
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
