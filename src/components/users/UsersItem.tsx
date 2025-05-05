import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../lib/query";
import { IUser } from "../../types/IUser";

interface IUsetItemProps {
  user: IUser;
  handleEditUser: (user: IUser) => void;
}

const deleteUser = async (id: number) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const UsersItem = ({ user, handleEditUser }: IUsetItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = () => {
    deleteMutate(user.id);
  };

  return (
    <div className="rounded-xl border p-2 text-xl">
      <div className="mb-5 grid grid-cols-4">
        <div className="">
          <div className="flex gap-2">
            <span>{user.name}</span>
            <span>{user.username}</span>
          </div>
        </div>
        <div className="grid">
          <span>Website: {user.website}</span>
        </div>
        <div className="grid h-fit">
          <span>Phone: {user.phone}</span>
          <span>WebSite: {user.website}</span>
        </div>
        <div className="grid">
          <span>mail: {user.email}</span>
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <button
          disabled={isPending}
          onClick={() => handleEditUser(user)}
          className="cursor-pointer rounded-md bg-[#4880FF] px-4 py-2 text-xl text-white transition-colors ease-in hover:bg-[#487fffc0]"
        >
          Edit
        </button>
        <button
          disabled={isPending}
          onClick={handleDelete}
          className="cursor-pointer rounded-md bg-[#d4550b] px-4 py-2 text-xl text-white transition-colors ease-in hover:bg-[#976f57]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
