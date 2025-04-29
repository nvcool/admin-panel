import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import { ITodo } from "../../types/ITodo";

interface ITodoFormProps {
  title: string;
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface INewTodo {
  title: string;
}

const createTodo = async (newTodo: INewTodo) => {
  const res = await fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
  });
  return await res.json();
};

const updateTodo = async ({ id, title }: { id: number; title: string }) => {
  const res = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
  return await res.json();
};

export const TodoForm = ({
  title,
  editId,
  setEditId,
  setText,
}: ITodoFormProps) => {
  const queryClient = useQueryClient();

  const { mutate: createMutate } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setText("");
    },
  });

  const { mutate: updateMutate } = useMutation<
    void,
    Error,
    { id: number; title: string }
  >({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setText("");
      setEditId(null);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      updateMutate({ id: editId, title });
    } else {
      createMutate({ title: title });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex gap-5 justify-center">
        <input
          value={title}
          onChange={(e) => setText(e.target.value)}
          className="w-[400px] hover:ring-1 focus:ring-2 outline-none py-2 px-4 rounded-xl ring-[#8280FF] transition-all ease-in bg-[#F5F6FA]"
          type="text "
          placeholder="Add new todo . . ."
        />
        <button className="bg-[#4880FF] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#487fffc0] transition-colors ease-in">
          {editId !== null ? "save" : "add"}
        </button>
        {editId !== null && (
          <button
            onClick={() => {
              setEditId(null);
              setText("");
            }}
            className="bg-[#eb363f] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#487fffc0] transition-colors ease-in">
            cancel
          </button>
        )}
      </div>
    </form>
  );
};
