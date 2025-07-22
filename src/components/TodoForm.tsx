import { useEffect, useState } from "react";
import type { TodoFormProps } from "../types/typeProps";
import "./css/TodoForm.css";

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [validedForm, setValidedForm] = useState(false);
  const [validedForm2, setValidedForm2] = useState(false);
  const [clickButton, setclickButton] = useState(false);

  useEffect(() => {
    if (clickButton && value === "") {
      setValidedForm(true);
      setclickButton(false);
    } else if (!clickButton && value !== "") {
      setValidedForm(false);
    }

    if (clickButton && category === "") {
      setValidedForm2(true);
      setclickButton(false);
    } else if (!clickButton && category !== "") {
      setValidedForm2(false);
    }
  }, [value, category, clickButton]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setclickButton(true);
    if (!value || !category) return;

    addTodo({ value, category });
    setValue("");
    setCategory("");
    setclickButton(false);
  };

  return (
    <div className="todo-form">
      <h2>Criar Tarefa:</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite a tarefa"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {validedForm && (
          <p className="error-parag">Por favor, digite uma tarefa.</p>
        )}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudos">Estudos</option>
        </select>
        {validedForm2 && (
          <p className="error-parag">Por favor, selecione uma categoria.</p>
        )}
        <button type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
