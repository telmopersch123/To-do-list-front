import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Filter from "./components/filter";

export function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("asc");
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      text: "Criar funcionabilidade X no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir ao mercado",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Fazer exercícios de React",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 4,
      text: "Ler um livro",
      category: "Pessoal",
      isCompleted: false,
    },
  ]);

  const addTodo = ({
    value,
    category,
  }: {
    value: string;
    category: string;
  }) => {
    const newTodos = [
      ...todoList,
      {
        id: Math.floor(Math.random() * 10000),
        text: value,
        category,
        isCompleted: false,
      },
    ];
    setTodoList(newTodos);
  };

  const removeTodo = (id: number) => {
    const newTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodos);
  };

  const completeTodo = (id: number) => {
    const newTodos = todoList.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });

    setTodoList(newTodos);
  };

  return (
    <>
      <div className="App">
        <h1 className="title">Lista de Tarefas</h1>
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
        <div className="todo-list">
          {todoList

            .filter((todo) =>
              filter === "all"
                ? true
                : filter === "completed"
                  ? todo.isCompleted
                  : !todo.isCompleted
            )
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLocaleLowerCase())
            )
            .sort((a, b) =>
              sort === "asc"
                ? a.text.localeCompare(b.text)
                : b.text.localeCompare(a.text)
            )
            .map((todoList) => (
              <Todo
                key={todoList.id}
                todoList={todoList}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
              />
            ))}
        </div>
        <TodoForm addTodo={addTodo} />
      </div>
    </>
  );
}

export default App;
