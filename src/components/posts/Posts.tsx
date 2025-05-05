import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../lib/query";
import { PostsList } from "./PostsList";
import { IPosts } from "../../types/IPosts";
import { IPaginationResponse } from "../../types/IPaginationResponse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { PostsCreateModal } from "./PostsCreateModal";
import { useState } from "react";
import { nextPage, prevPage, setLimit } from "../todo/TodoSlice";

export type IPostFormData = {
  title: string;
  body: string;
};

const getAllPosts = async (page: number, limit: number) => {
  const res = await fetch(`${API_URL}/posts?_page=${page}&_per_page=${limit}`);
  return (await res.json()) as IPaginationResponse<IPosts>;
};

export const Posts = () => {
  const [formData, setFormData] = useState<IPostFormData>({
    title: "",
    body: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const pagination = useSelector((state: RootState) => state.todoPage);
  const dispatch = useDispatch();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", pagination.page, pagination.limit],
    queryFn: () => getAllPosts(pagination.page, pagination.limit),
  });

  return (
    <div className="grid gap-5">
      <div className="flex justify-center rounded-xl bg-white p-5">
        <PostsCreateModal
          editId={editId}
          setEditId={setEditId}
          formData={formData}
          setFormData={setFormData}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>

      <div className="rounded-xl bg-white p-5">
        <div className="mb-4 flex justify-center gap-5 text-xl">
          <button
            onClick={() => dispatch(prevPage())}
            className="cursor-pointer rounded-md bg-white p-2"
          >
            prev
          </button>
          <button
            onClick={() => dispatch(nextPage())}
            className="cursor-pointer rounded-md bg-white p-2"
          >
            next
          </button>
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
        {posts && (
          <PostsList
            posts={posts.data}
            setEditId={setEditId}
            setFormData={setFormData}
            setModalOpen={setModalOpen}
          />
        )}
      </div>
    </div>
  );
};
