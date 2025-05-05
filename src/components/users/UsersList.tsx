import { UsersItem } from "./UsersItem";
import { IUser } from "../../types/IUser";
import { UsersFormData } from "./Users";

interface IUsersListProps {
  users: IUser[] | undefined;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<UsersFormData>>;
}

export const UsersList = ({
  users,
  setUserId,
  setFormData,
  setModalOpen,
}: IUsersListProps) => {
  const handleEditUser = (
    userId: number,
    currentName: string,
    currentUserName: string,
    currentEmail: string,
    currentAddress: string,
    currentPhone: string,
    currentWebsite: string,
  ) => {
    setUserId(userId);
    setFormData({
      name: currentName,
      username: currentUserName,
      email: currentEmail,
      address: currentAddress,
      phone: currentPhone,
      website: currentWebsite,
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
