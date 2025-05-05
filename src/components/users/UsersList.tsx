import { UsersItem } from "./UsersItem";
import { IUser, UserCreatePayload } from "../../types/IUser";

interface IUsersListProps {
  users: IUser[] | undefined;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<UserCreatePayload>>;
}

export const UsersList = ({
  users,
  setUserId,
  setFormData,
  setModalOpen,
}: IUsersListProps) => {
  const handleEditUser = (user: IUser) => {
    setUserId(user.id);
    setFormData({
      ...user,
    });
    setModalOpen(true);
  };

  return (
    <ul className="grid gap-2">
      {users?.map((user) => {
        return (
          <li key={user.id} className="grid">
            <UsersItem user={user} handleEditUser={handleEditUser} />
          </li>
        );
      })}
    </ul>
  );
};
