import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../lib/query";
import { IUser, UserCreatePayload } from "../../types/IUser";
import { FormEvent } from "react";

interface IUsersCreateFormProps {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  formData: IUserForm;
  setFormData: React.Dispatch<React.SetStateAction<IUserForm>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUserForm {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

type InputField = keyof IUserForm;

const initialFormState: IUserForm = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
};

const inputs: {
  name: InputField;
  label: string;
  placeholder: string;
  type: string;
}[] = [
  { name: "name", label: "Name", placeholder: "Name . . .", type: "text" },
  {
    name: "username",
    label: "Username",
    placeholder: "Username . . .",
    type: "text",
  },
  { name: "email", label: "Email", placeholder: "Email . . .", type: "email" },
  { name: "phone", label: "Phone", placeholder: "Phone . . .", type: "text" },
  {
    name: "website",
    label: "WebSite",
    placeholder: "WebSite . . .",
    type: "string",
  },
];

const createUser = async (newUser: IUserForm) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  return await res.json();
};

const updateUser = async ({
  id,
  name,
  username,
  email,
  phone,
  website,
}: IUserForm & { id: number }) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, username, email, phone, website }),
  });
  return await res.json();
};

export const UsersCreateForm = ({
  userId,
  setUserId,
  formData,
  setFormData,
  setModalOpen,
}: IUsersCreateFormProps) => {
  const queryClient = useQueryClient();

  const { mutate: createMutateUser, isPending: isCreatePending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFormData(initialFormState);
      setModalOpen(false);
    },
  });

  const { mutate: updateMutate, isPending: isEditPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFormData(initialFormState);
      setModalOpen(false);
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData2 = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
    };

    if (userId !== null) {
      updateMutate({
        id: userId,
        ...formData2,
      });
    } else {
      createMutateUser({
        ...formData2,
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid justify-center">
      {inputs.map((input) => {
        return (
          <label className="mb-4 grid w-fit justify-center rounded-xl border border-[#F5F6FA] p-2">
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
      <button
        disabled={isCreatePending || isEditPending}
        className="cursor-pointer rounded-md bg-[#4880FF] px-8 py-4 text-xl text-white transition-colors ease-in hover:bg-[#487fffc0]"
      >
        {userId ? "save" : "add"}
      </button>
    </form>
  );
};
