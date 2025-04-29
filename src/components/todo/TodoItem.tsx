import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITodo } from "../../types/ITodo";
import Checkbox from "../ui/Checkbox";

interface ITodoItemProps {
  todo: ITodo;
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  handleEdit: (todoId: number, currentText: string) => void;
}

const deleteTodoItem = async (id: number) => {
  const res = await fetch(`http://localhost:3000/todos/${id}`, {
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
    <div className="flex justify-between border-b pb-2 border-gray-300">
      <Checkbox
        isPending={isPending}
        onChange={onChange}
        todoCheck={todo.completed}
      />
      <span
        className={`uppercase font-semibold ${
          todo.completed ? " line-through opacity-50" : ""
        }`}>
        {todo.title}
      </span>
      <div className="flex gap-2 h-[43px]">
        <button
          onClick={() => handleEdit(todo.id, todo.title)}
          className="cursor-pointer bg-[#4880FF] text-white py-2 px-4 rounded-md hover:bg-[#487fffc0] transition-colors ease-in">
          edit
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer bg-[#eb363f] text-white py-2 px-4 rounded-md hover:bg-[#487fffc0] transition-colors ease-in">
          delete
        </button>
      </div>
    </div>
  );
};
