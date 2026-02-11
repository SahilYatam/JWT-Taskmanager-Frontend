import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Todo } from "../../types/todo.js";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { Input, Button } from "../shared/index";
import { motion } from "motion/react";

interface TodoItemProps {
    todo: Todo;
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

export const TodoItem = ({
    todo,
    onToggle,
    onDelete,
    onEdit,
}: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || "");

    const handleSave = () => {
        if (!title.trim()) return;
        onEdit(todo.id.toString(), { title, description });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTitle(todo.title);
        setDescription(todo.description || "");
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-gray-800 rounded-lg space-y-3"
        >
            {isEditing ? (
                <>
                    <Input
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Todo title"
                    />

                    <Input
                        value={description}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDescription(e.target.value)
                        }
                        placeholder="Description (optional)"
                    />
                    <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="success" onClick={handleSave}>
                            <Check size={16} />
                            Save
                        </Button>
                        <Button size="sm" variant="secondary" onClick={handleCancel}>
                            <X size={16} />
                            Cancel
                        </Button>
                    </div>
                </>
            ) : (
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={todo.is_completed}
                            onChange={() => onToggle(todo.id.toString())}
                            className="checkbox checkbox-primary mt-1"
                        />

                        <div>
                            <p
                                className={`font-medium ${todo.is_completed
                                        ? "line-through text-gray-400"
                                        : "text-white"
                                    }`}
                            >
                                {todo.title}
                            </p>
                            {todo.description && (
                                <p className="text-sm text-gray-400">{todo.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setIsEditing(true)}
                        >
                            <Pencil size={16} />
                        </Button>
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => onDelete(todo.id.toString())}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
