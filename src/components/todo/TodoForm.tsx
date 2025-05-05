import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import { API_URL } from "../../lib/query";

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
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify(newTodo),
  });
  return await res.json();
};

const updateTodo = async ({ id, title }: { id: number; title: string }) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
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
      <div className="flex justify-center gap-5">
        <input
          value={title}
          onChange={(e) => setText(e.target.value)}
          className="w-[400px] rounded-xl bg-[#F5F6FA] px-4 py-2 ring-[#8280FF] transition-all ease-in outline-none hover:ring-1 focus:ring-2"
          type="text "
          placeholder="Add new todo . . ."
        />
        <button className="cursor-pointer rounded-md bg-[#4880FF] px-4 py-2 text-white transition-colors ease-in hover:bg-[#487fffc0]">
          {editId !== null ? "save" : "add"}
        </button>
        {editId !== null && (
          <button
            onClick={() => {
              setEditId(null);
              setText("");
            }}
            className="cursor-pointer rounded-md bg-[#eb363f] px-4 py-2 text-white transition-colors ease-in hover:bg-[#487fffc0]"
          >
            cancel
          </button>
        )}
      </div>
    </form>
  );
};
