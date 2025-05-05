import * as Dialog from "@radix-ui/react-dialog";
import { IUserForm, UsersCreateForm } from "./UsersCreateForm";

interface IUsersCreateModalProps {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  formData: IUserForm;
  setFormData: React.Dispatch<React.SetStateAction<IUserForm>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UsersCreateModal = ({
  userId,
  setUserId,
  formData,
  setFormData,
  modalOpen,
  setModalOpen,
}: IUsersCreateModalProps) => {
  return (
    <Dialog.Root
      open={modalOpen}
      onOpenChange={(isOpen) => {
        setModalOpen(isOpen);
        if (!isOpen) {
          setFormData({
            name: "",
            username: "",
            email: "",
            phone: "",
            website: "",
          });
        }
      }}
    >
      <Dialog.Trigger className="h-fit cursor-pointer rounded-md bg-[#4880FF] px-8 py-4 text-xl text-white transition-colors ease-in hover:bg-[#487fffc0]">
        Create new User
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed inset-0 top-[45%] left-1/2 h-fit w-[500px] -translate-1/2 rounded-xl bg-white p-2">
          <Dialog.Close className="hover absolute right-0 mr-5 cursor-pointer rounded-md bg-[#F5F6FA] px-2 py-1 transition-all ease-in hover:opacity-50">
            close
          </Dialog.Close>
          <Dialog.Title className="mb-4 text-center text-2xl">
            New User
          </Dialog.Title>
          <UsersCreateForm
            userId={userId}
            setUserId={setUserId}
            formData={formData}
            setFormData={setFormData}
            setModalOpen={setModalOpen}
          />
          <Dialog.Description />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
