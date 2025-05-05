import { useQuery } from "@tanstack/react-query";
import { UsersCreateModal } from "./UsersCreateModal";
import { UsersList } from "./UsersList";
import { API_URL } from "../../lib/query";
import { IUser } from "../../types/IUser";
import { IPaginationResponse } from "../../types/IPaginationResponse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { nextPage, prevPage, setLimit } from "../users/userSlice";
import { useState } from "react";
import { IUserForm } from "./UsersCreateForm";

const getAllUsers = async (page: number, limit: number) => {
  const res = await fetch(`${API_URL}/users?_page=${page}&_per_page=${limit}`);
  return (await res.json()) as IPaginationResponse<IUser>;
};

export const Users = () => {
  const [formData, setFormData] = useState<IUserForm>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [userId, setUserId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const pagination = useSelector((state: RootState) => state.userPage);
  const dispatch = useDispatch();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", pagination.page, pagination.limit],
    queryFn: () => getAllUsers(pagination.page, pagination.limit),
  });

  return (
    <div className="grid gap-10">
      <div className="flex justify-center rounded-xl bg-white p-5">
        <UsersCreateModal
          userId={userId}
          setUserId={setUserId}
          formData={formData}
          setFormData={setFormData}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
      <div className="grid h-fit rounded-xl bg-white p-5">
        <div className="mb-4 flex justify-center gap-5 text-xl">
          <button
            onClick={() => dispatch(prevPage())}
            className="cursor-pointer rounded-md bg-white p-2"
          >
            prev
          </button>
          {pagination.page !== users?.last && (
            <button
              onClick={() => dispatch(nextPage())}
              className="cursor-pointer rounded-md bg-white p-2"
            >
              next
            </button>
          )}
          <select
            onChange={(e) => dispatch(setLimit(+e.target.value))}
            value={pagination.limit}
            name=""
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        {isLoading && "Loading . . ."}
        {users && (
          <UsersList
            users={users?.data}
            setModalOpen={setModalOpen}
            setUserId={setUserId}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};
