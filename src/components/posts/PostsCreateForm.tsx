import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../lib/query";
import { FormEvent } from "react";
import { IPostFormData } from "./Posts";

interface IPostsCreateFormProps {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  formData: {
    title: string;
    body: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      body: string;
    }>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface INewPost {
  title: string;
  body: string;
}

type InputField = keyof IPostFormData;

const inputs: {
  name: InputField;
  label: string;
  placeholder: string;
  type: string;
}[] = [
  { name: "title", label: "Title", placeholder: "Title . . .", type: "text" },
  {
    name: "body",
    label: "Text",
    placeholder: "Text . . .",
    type: "text",
  },
];

const createPost = async (newPost: INewPost) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(newPost),
  });
  return await res.json();
};

const updatePost = async ({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, body }),
  });
  return await res.json();
};

export const PostsCreateForm = ({
  editId,
  formData,
  setFormData,
  setIsOpen,
}: IPostsCreateFormProps) => {
  const queryClient = useQueryClient();

  const { mutate: createMutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setFormData({ title: "", body: "" });
    },
  });

  const { mutate: updateMutate } = useMutation<
    void,
    Error,
    { id: number; title: string; body: string }
  >({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      updateMutate({ id: editId, title: formData.title, body: formData.body });
    } else {
      createMutate({ title: formData.title, body: formData.body });
    }
    setFormData({ title: "", body: "" });
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid justify-center">
      {inputs.map((input) => {
        return (
          <label
            key={input.name}
            className="mb-4 grid w-fit justify-center rounded-xl border border-[#F5F6FA] p-2"
            htmlFor=""
          >
            <span className="mb-2 pl-4 text-xl">{input.label}</span>
            <input
              name={input.name}
              value={formData[input.name]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [input.name]: e.target.value,
                }))
              }
              className="w-[400px] rounded-xl bg-[#F5F6FA] px-4 py-2 ring-[#8280FF] transition-all ease-in outline-none hover:ring-1 focus:ring-2"
              placeholder={input.placeholder}
              type={input.type}
            />
          </label>
        );
      })}
      <button className="cursor-pointer rounded-md bg-[#4880FF] px-8 py-4 text-xl text-white transition-colors ease-in hover:bg-[#487fffc0]">
        {editId !== null ? "save" : "add"}
      </button>
    </form>
  );
};
