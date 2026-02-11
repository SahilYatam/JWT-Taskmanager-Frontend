import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "../shared";

interface AddTodoFormProps {
    onAdd: (title: string, description?: string) => void;
    loading?: boolean;
}

export const AddTodoForm = ({ onAdd, loading }: AddTodoFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd(title.trim(), description.trim() || undefined);

        setTitle("");
        setDescription("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl"
        >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Todo
            </h2>

            <div className="space-y-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    }
                    placeholder="Title"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <textarea
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setDescription(e.target.value)
                    }
                    placeholder="Description (optional)"
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    {loading ? "Adding..." : "Add Todo"}
                </Button>
            </div>
        </form>
    );
};
