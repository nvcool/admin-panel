interface ITodoFormProps {
  text: string;
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoForm = ({
  text,
  editId,
  setEditId,
  setText,
}: ITodoFormProps) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="">
      <div className="flex gap-5 justify-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-[400px] hover:ring-1 focus:ring-2 outline-none py-2 px-4 rounded-xl ring-[#8280FF] transition-all ease-in bg-[#F5F6FA]"
          type="text "
          placeholder="Add new todo . . ."
        />
        <button className="bg-[#4880FF] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#487fffc0] transition-colors ease-in">
          {editId !== null ? "save" : "add"}
        </button>
        {editId !== null && (
          <button
            onClick={() => {
              setEditId(null);
              setText("");
            }}
            className="bg-[#eb363f] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#487fffc0] transition-colors ease-in">
            cancel
          </button>
        )}
      </div>
    </form>
  );
};
