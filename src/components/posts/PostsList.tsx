import { IPosts } from "../../types/IPosts";
import { IPostFormData } from "./Posts";
import { PostsItem } from "./PostsItem";

interface IPostsListProps {
  posts: IPosts[];
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setFormData: React.Dispatch<React.SetStateAction<IPostFormData>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostsList = ({
  posts,
  setEditId,
  setFormData,
  setModalOpen,
}: IPostsListProps) => {
  const handleEditPost = (
    postId: number,
    currentTitle: string,
    currentText: string,
  ) => {
    setEditId(postId);
    setFormData({ title: currentTitle, body: currentText });
    setModalOpen(true);
  };

  return (
    <ul>
      <li className="grid gap-5">
        {posts.map((item) => {
          return <PostsItem item={item} handleEditPost={handleEditPost} />;
        })}
      </li>
    </ul>
  );
};
