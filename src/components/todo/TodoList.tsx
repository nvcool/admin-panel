import { ITodo } from "../../types/ITodo";
import { TodoItem } from "./TodoItem";

interface ITodoListProps {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  todos: ITodo[];
}

export const TodoList = ({ setEditId, setText, todos }: ITodoListProps) => {
  const handleEdit = (todoId: number, currentText: string) => {
    setEditId(todoId);
    setText(currentText);
  };

  return (
    <ul className="grid gap-3 rounded-xl bg-white p-4">
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <TodoItem todo={todo} handleEdit={handleEdit} />
          </li>
        );
      })}
    </ul>
  );
};
