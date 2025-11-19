import api from "./api.service";

export const creatingTodo = async (todo) => {
  try {
    const res = await api.post("/todo", { todo });
    if (res.status !== 200) return { ok: false, message: res.data.message };

    console.log(res);

    return {
      ok: true,
      todo: res.data.todo,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const gettingTodos = async () => {
  try {
    const res = await api.get("/todo");
    if (res.status !== 200) return { ok: false, message: res.data.message };

    return {
      ok: true,
      todos: res.data.todos,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
