import * as Checkbox2 from "@radix-ui/react-checkbox";
import check from "../../assets/checkbox-img.svg";

import { useState } from "react";

interface ICheckboxProps {
  todoCheck: boolean;
  isPending: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ todoCheck, isPending, onChange }: ICheckboxProps) => {
  const [isCheckedTodo, setIsCheckedTodo] = useState<boolean>(todoCheck);

  const toogleCheck = (newState: boolean) => {
    setIsCheckedTodo(newState);
  };

  return (
    <Checkbox2.Root
      disabled={isPending}
      checked={isCheckedTodo}
      onCheckedChange={(newState) => {
        toogleCheck(!!newState);
        onChange(!!newState);
      }}
      className={` h-7 w-7 rounded-md transition-all ease-in cursor-pointer hover:ring-1 ring-[#4880FF]  ${
        isCheckedTodo ? "bg-[#4880FF]" : "border border-[#4880FF]"
      }`}
      id="c1">
      <Checkbox2.Indicator className=" flex  justify-center">
        <img className="pb-1" src={check} alt="" />
      </Checkbox2.Indicator>
    </Checkbox2.Root>
  );
};

export default Checkbox;
