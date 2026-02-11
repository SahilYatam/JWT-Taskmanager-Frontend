import { create } from "zustand";
import { todoApi } from "../api/todo";
import { useAuthStore } from "./authStore";

export interface Todo {
    id: string;
    title: string;
    description?: string;
    is_completed: boolean;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;

    setTodos: (todos: Todo[]) => void;
    fetchTodos: () => Promise<void>;
    addTodo: (data: { title: string; description?: string }) => Promise<void>;
    updateTodo: (id: string, updates: Partial<Todo>) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
    todos: [],
    loading: false,

    setTodos: (todos) => set({ todos }),

    fetchTodos: async () => {
        set({ loading: true });
        try {
            const todos = await todoApi.fetchTodos();
            set({ todos });
        } finally {
            set({ loading: false });
        }
    },

    addTodo: async (todo) => {
        const { isAuthenticated } = useAuthStore.getState();

        if (!isAuthenticated) {
            throw new Error("NOT_AUTHENTICATED");
        }
        const tempId = crypto.randomUUID();

        const optimticTodo = {
            id: tempId,
            title: todo.title,
            description: todo.description,
            is_completed: false,
        };

        // Instant UI update
        set((state) => ({ todos: [optimticTodo, ...state.todos] }));

        try {
            const realTodo = await todoApi.createTodo({
                title: todo.title,
                description: todo.description,
            });

            // Replacing temp todo with real todo
            set((state) => ({
                todos: state.todos.map((t) => (t.id === tempId ? realTodo : t)),
            }));
        } catch (err) {
            // Rollback if API fails
            set((state) => ({
                todos: state.todos.filter((t) => t.id !== tempId),
            }));
            throw err;
        }
    },

    updateTodo: async (id, updates) => {
        const previousTodos = get().todos;

        // Instant update
        set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));

        try {
            const updatedTodo = await todoApi.updateTodo(id, updates);

            set((state) => ({
                todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
            }));
        } catch (err) {
            set({ todos: previousTodos });
            throw err;
        }
    },

    deleteTodo: async (id) => {
        const previousTodos = get().todos;

        // Instant remove
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));

        try {
            await todoApi.deleteTodo(id);
        } catch (err) {
            // Rollback
            set({ todos: previousTodos });
            throw err;
        }
    },

    toggleTodo: async (id) => {
        const previousTodos = get().todos;

        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo,
            ),
        }));

        try {
            const todo = previousTodos.find((t) => t.id === id);
            if (!todo) return;

            await todoApi.updateTodo(id, { is_completed: !todo.is_completed });
        } catch (err) {
            set({ todos: previousTodos });
            throw err;
        }
    },
}));
