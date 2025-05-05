import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../lib/query";
import { IPosts } from "../../types/IPosts";

interface IPostItemProps {
  item: IPosts;
  handleEditPost: (
    postId: number,
    currentTitle: string,
    currentText: string,
  ) => void;
}

const deletePost = async (id: number) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const PostsItem = ({ item, handleEditPost }: IPostItemProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = () => {
    deleteMutate(item.id);
  };
  return (
    <div className="grid gap-5 rounded-xl border p-5">
      <span className="text-xl text-amber-900">{item.title}</span>
      <div className="">
        <span>{item.body}</span>
      </div>
      <div className="flex justify-center gap-5">
        <button
          onClick={() => handleEditPost(item.id, item.title, item.body)}
          className="cursor-pointer rounded-md bg-[#4880FF] px-4 py-2 text-white transition-colors ease-in hover:bg-[#487fffc0]"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer rounded-md bg-[#d4550b] px-4 py-2 text-white transition-colors ease-in hover:bg-[#976f57]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
