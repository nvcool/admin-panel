import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITodo } from "../../types/ITodo";
import Checkbox from "../ui/Checkbox";
import { API_URL } from "../../lib/query";

interface ITodoItemProps {
  todo: ITodo;
  handleEdit: (todoId: number, currentText: string) => void;
}

const deleteTodoItem = async (id: number) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const TodoItem = ({ todo, handleEdit }: ITodoItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: toggleCompleted, isPending } = useMutation({
    mutationFn: (todo: ITodo) =>
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: todo.completed }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteTodoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = () => {
    deleteMutate(todo.id);
  };

  const onChange = (checked: boolean) => {
    toggleCompleted({ ...todo, completed: checked });
  };

  return (
    <div className="flex justify-between border-b border-gray-300 pb-2">
      <Checkbox
        isPending={isPending}
        onChange={onChange}
        todoCheck={todo.completed}
      />
      <span
        className={`font-semibold uppercase ${
          todo.completed ? "line-through opacity-50" : ""
        }`}
      >
        {todo.title}
      </span>
      <div className="flex h-[43px] gap-2">
        <button
          onClick={() => handleEdit(todo.id, todo.title)}
          className="cursor-pointer rounded-md bg-[#4880FF] px-4 py-2 text-white transition-colors ease-in hover:bg-[#487fffc0]"
        >
          edit
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer rounded-md bg-[#eb363f] px-4 py-2 text-white transition-colors ease-in hover:bg-[#487fffc0]"
        >
          delete
        </button>
      </div>
    </div>
  );
};
