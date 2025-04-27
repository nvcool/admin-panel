import { useMutation } from "@tanstack/react-query";
import { ITodo } from "../../types/ITodo";
import Checkbox from "../ui/Checkbox";

interface ITodoItemProps {
  todo: ITodo;
  handleEdit: (todoId: number, currentText: string) => void;
}

const updateTodoItem = async (todo: ITodo) => {
  return fetch(`http://localhost:3000/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });
};

export const TodoItem = ({ todo, handleEdit }: ITodoItemProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (todo: ITodo) =>
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(todo),
      }),
  });

  const onChange = (checked: boolean) => {
    mutate({ ...todo, completed: checked });
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
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(todo.id, todo.title)}
          className="cursor-pointer bg-[#4880FF] text-white py-2 px-4 rounded-md hover:bg-[#487fffc0] transition-colors ease-in">
          edit
        </button>
        <button className="cursor-pointer bg-[#eb363f] text-white py-2 px-4 rounded-md hover:bg-[#487fffc0] transition-colors ease-in">
          delete
        </button>
      </div>
    </div>
  );
};
