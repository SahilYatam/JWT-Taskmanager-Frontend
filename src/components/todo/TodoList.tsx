import type { Todo } from "../../types/todo";
import { TodoItem } from "./TodoItem";
import { Reorder } from "motion/react";

interface TodoListProps {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (
        id: string,
        data: {
            title: string;
            description?: string;
        },
    ) => void;
}

export const TodoList = ({
    todos,
    setTodos,
    onToggle,
    onDelete,
    onEdit,
}: TodoListProps) => {
    if (todos.length === 0) {
        return <p className="text-gray-400 text-center mt-6">No todos yet 👀</p>;
    }

    return (
        <Reorder.Group
            axis="y"
            values={todos}
            onReorder={setTodos}
            className="space-y-3 mt-6"
        >
            {todos.map((todo) => (
                <Reorder.Item
                    key={todo.id}
                    value={todo}
                    className="cursor-grab active:cursor-grabbing"
                >
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
};
