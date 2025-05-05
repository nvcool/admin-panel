import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../lib/query";
import { IPaginationResponse } from "../../types/IPaginationResponse";
import { ITodo } from "../../types/ITodo";
import { nextPage, prevPage, setLimit } from "./todoSlice";

const getAllTodos = async (page: number, limit: number) => {
  const res = await fetch(`${API_URL}/todos?_page=${page}&_per_page=${limit}`);

  return (await res.json()) as IPaginationResponse<ITodo>;
};

export const Todo = () => {
  const [text, setText] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  const pagination = useSelector((state: RootState) => state.todoPage);
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["todos", pagination.page, pagination.limit],
    queryFn: () => getAllTodos(pagination.page, pagination.limit),
  });

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="h-[400px] rounded-xl bg-white p-5">
        <TodoForm
          title={text}
          setText={setText}
          editId={editId}
          setEditId={setEditId}
        />
      </div>
      <div className=" ">
        <div className="mb-4 flex justify-center gap-5 text-xl">
          <button
            onClick={() => dispatch(prevPage())}
            className="cursor-pointer rounded-md bg-white p-2"
          >
            prev
          </button>
          {pagination.page !== data?.last && (
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
        {isLoading && "loading . . ."}
        {data && (
          <TodoList
            editId={editId}
            todos={data.data}
            setEditId={setEditId}
            setText={setText}
          />
        )}
      </div>
    </div>
  );
};
