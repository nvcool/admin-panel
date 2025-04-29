import { API_URL } from "../../lib/query";
import { ITodo } from "../../types/ITodo";
import { TodoItem } from "./TodoItem";

interface ITodoListProps {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  todos: ITodo[];
}

const getTodo = async (id: number) => {
  const res = await fetch(`${API_URL}/todos/${id}}`);
  console.log(res);

  return res.json();
};

export const TodoList = ({
  setEditId,
  setText,
  todos,
  editId,
}: ITodoListProps) => {
  const handleEdit = (todoId: number, currentText: string) => {
    setEditId(todoId);
    setText(currentText);
  };

  return (
    <ul className="grid gap-3 rounded-xl bg-white p-4">
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <TodoItem
              editId={editId}
              setEditId={setEditId}
              todo={todo}
              handleEdit={handleEdit}
            />
          </li>
        );
      })}
    </ul>
  );
};
