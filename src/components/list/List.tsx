import st from "./List.module.scss";
import ListItem from "../list-item/ListItem";
import { Todo } from "../../App";

type Props = {
  list: Todo[];
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
};

export default function List({
  list,
  completeTodo,
  deleteTodo,
  editTodo,
}: Props) {
  return (
    <div className={st.root}>
      {list.map((item) => (
        <ListItem
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          item={item}
          key={item.id}
        />
      ))}
    </div>
  );
}
