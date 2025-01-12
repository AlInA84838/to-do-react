import st from "./ListItem.module.scss";
import trash from "../../assets/icons/trash.svg";
import edit from "../../assets/icons/edit.svg";
import classNames from "classnames";
import { Todo } from "../../App";

type Props = {
  item: Todo;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
};

export default function ListItem({
  item,
  completeTodo,
  deleteTodo,
  editTodo,
}: Props) {
  return (
    <div className={classNames(st.root, item.completed ? st.completed : "")}>
      <div className={st.left}>
        <button
          onClick={() => completeTodo(item.id)}
          className={st.checkbox}
        ></button>
        <h4>{item.title}</h4>
      </div>
      <div className={st.right}>
        <button className={st.icon} onClick={() => editTodo(item.id)}>
          <img src={edit} alt="" />
        </button>
        <button className={st.icon} onClick={() => deleteTodo(item.id)}>
          <img src={trash} alt="" />
        </button>
      </div>
    </div>
  );
}
