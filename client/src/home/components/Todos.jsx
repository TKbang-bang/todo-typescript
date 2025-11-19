import React, { useEffect, useState } from "react";
import { creatingTodo, gettingTodos } from "../../services/todo.service";

function Todos() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await gettingTodos();
        if (!res.ok) throw new Error(res.message);

        setTodos(res.todos);
      } catch (error) {
        return alert(error.message);
      }
    };

    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await creatingTodo(todo);
      if (!res.ok) throw new Error(res.message);

      setTodos([res.todo, ...todos]);
      setTodo("");
    } catch (error) {
      return alert(error.message);
    }
  };

  return (
    <div className="todos">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Todos;
