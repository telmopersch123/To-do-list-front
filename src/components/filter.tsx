import "./css/filter.css";
const Filter = ({
  filter,
  setFilter,
  setSort,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="filter">
      <h2>Filtrar</h2>
      <div className="options">
        <div>
          <p>Status:</p>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="completed">Concluídos</option>
            <option value="uncompleted">Incompletos</option>
          </select>
        </div>
        <div>
          <p>Ordem alfabética:</p>
          <button onClick={() => setSort("asc")}>Asc</button>
          <button onClick={() => setSort("desc")}>Desc</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
