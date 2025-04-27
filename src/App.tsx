import { Route, Routes } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { Admin } from "./components/admin/Admin";
import { Todo } from "./components/todo/Todo";
import { Posts } from "./components/posts/Posts";
import { Users } from "./components/users/Users";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Admin />} />
          <Route path="todo" element={<Todo />} />
          <Route path="posts" element={<Posts />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
