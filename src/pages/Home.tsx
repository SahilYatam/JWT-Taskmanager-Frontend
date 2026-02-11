import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useTodoStore } from "../store/todoStore";

import { AddTodoForm } from "../components/todo/AddTodoForm";
import { TodoList } from "../components/todo/TodoList";
import { logoutUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuthStore();

    const {
        todos,
        setTodos,
        loading,
        fetchTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
    } = useTodoStore();

    // Fetch todos only if user is logged in
    useEffect(() => {
        if (isAuthenticated) {
            fetchTodos().catch((err) => {
                console.error(err);
            });
        }
    }, [isAuthenticated]);

    const handleTodo = async (title: string, description?: string) => {
        if (!isAuthenticated) {
            alert("Login to create todo");
            navigate("/login");
            return;
        }

        try {
            await addTodo({ title, description });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.message === "NOT_AUTHENTICATED") {
                navigate("/login");
            } else {
                console.error(err);
            }
        }
    };

    const handleLogout = async () => {
        await logoutUser();
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">
                    Welcome,{" "}
                    <span className="text-purple-400">{user?.name || "Guest"}</span> 👋
                </h1>

                <button
                    onClick={() => (user ? handleLogout() : navigate("/login"))}
                    className={`px-4 py-2 text-white rounded-lg transition cursor-pointer ${user
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {user ? "Logout" : "Login"}
                </button>
            </div>

            {/* Add Todo */}
            <AddTodoForm onAdd={handleTodo} loading={loading} />

            {/* Todo List */}
            {loading && todos.length === 0 ? (
                <p className="text-gray-400 mt-6">Loading todos...</p>
            ) : todos.length > 0 ? (
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={updateTodo}
                />
            ) : (
                isAuthenticated && (
                    <p className="text-gray-400 mt-6 text-center">
                        No todos yet. Create your first one!
                    </p>
                )
            )}
        </div>
    );
};

export default Home;
