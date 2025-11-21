import React, { useEffect, useState } from "react";
import {
  creatingTodo,
  deleteTodo,
  gettingTodos,
  setTodoDone,
} from "../../services/todo.service";
import "./components.css";

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

  const handleDone = async (id) => {
    try {
      const res = await setTodoDone(id);
      if (!res.ok) throw new Error(res.message);

      setTodos(todos.filter((todo) => todo.id !== id));
      return;
    } catch (error) {
      return alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteTodo(id);
      if (!res.ok) throw new Error(res.message);

      setTodos(todos.filter((todo) => todo.id !== id));
      return;
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

      <div className="todos_container">
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <p>{todo.content}</p>
            <div className="btns">
              <button onClick={() => handleDone(todo.id)}>Done</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;
