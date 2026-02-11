import { api } from "./axios";
import type { Todo } from "../store/todoStore";

const fetchTodos = async (): Promise<Todo[]> => {
    const res = await api.get("/todo");
    return res.data.todos;
};

const createTodo = async (data: {
    title: string;
    description?: string;
}): Promise<Todo> => {
    const res = await api.post("/todo/create", data);
    return res.data.todo;
};

const updateTodo = async (
    todo_id: string,
    updates: Partial<Todo>,
): Promise<Todo> => {
    const res = await api.patch(`/todo/update/${todo_id}`, updates);
    return res.data.todo;
};

const markTodoAsCompleted = async (todo_id: string): Promise<Todo> => {
    const res = await api.patch(`/todo/mark-complete/${todo_id}`);
    return res.data.todo;
};

const deleteTodo = async (todo_id: string) => {
    await api.delete(`/todo/${todo_id}`);
};

export const todoApi = {
    fetchTodos,
    createTodo,
    updateTodo,
    markTodoAsCompleted,
    deleteTodo
}
