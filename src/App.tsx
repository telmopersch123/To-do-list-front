import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import Search from "./components/Search";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Filter from "./components/filter";
import type { TodoType } from "./types/typeProps";
const UrlBack = import.meta.env.VITE_API_URL;

export function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("asc");
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);

  //GET
  const fetchTodos = async () => {
    try {
      const resp = await fetch(`${UrlBack}/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Erro ao buscar tarefas");
      }
      const data = await resp.json();

      setTodoList(data);
    } catch (error) {
      toast.error("Ocorreu um erro. Tente novamente em instantes.");
      console.error("Erro ao buscar tarefas:", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  //POST
  const addTodo = async ({
    value,
    category,
  }: {
    value: string;
    category: string;
  }) => {
    setLoading(true);

    const existingTodo = todoList.some(
      (todo) => todo.text.trim() === value.trim()
    );
    if (existingTodo) {
      toast.error("Tarefa ja cadastrada, altere o nome, seja criativo :)");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${UrlBack}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: value,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa");
      }

      const data = await response.json();
      console.info("Tarefa criada:", data); // Depurar ID retornado
      await fetchTodos(); // Sincroniza a lista após adicionar
      toast.success("Tarefa criada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      toast.error("Ocorreu um erro. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };
  //DELETE
  const removeTodo = async (id: number | string) => {
    try {
      const response = await fetch(`${UrlBack}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir tarefa");
      }

      await fetchTodos(); // Sincroniza a lista após excluir
      toast.success("Tarefa excluída com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro. Tente novamente em instantes.");
      console.error("Erro ao excluir tarefa:", error);
    }
  };
  //PATH
  const completeTodo = async (id: number | string) => {
    try {
      const todoListVerification = todoList.find((todo) => todo.id === id);

      if (!todoListVerification) {
        throw new Error("Tarefa não encontrada no frontend");
      }

      const updatedIsCompleted = !todoListVerification.isCompleted;

      const response = await fetch(`${UrlBack}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: updatedIsCompleted,
        }),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa");
      }

      await fetchTodos(); // Sincroniza a lista após atualizar
    } catch (error) {
      toast.error("Ocorreu um erro. Tente novamente em instantes.");
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <>
      {loading && (
        <div className="back-loading">
          <div className="spinner">
            <div className="cube1"></div>
            <div className="cube2"></div>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
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
              todo.text.toLowerCase().includes(search.toLowerCase())
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
