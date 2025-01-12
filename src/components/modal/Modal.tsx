import { useEffect, useState } from "react";
import st from "./Modal.module.scss";
import plus from "../../assets/icons/plus.svg";
import { Todo } from "../../App";

type Props = {
  addTodo: (text: string) => void;
  editId: number | null;
  setEditId: (id: number | null) => void;
  list: Todo[];
  changeTodo: (id: number, text: string) => void;
};

export default function Modal({
  addTodo,
  editId,
  setEditId,
  list,
  changeTodo,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  function handleSubmit() {
    if (editId) {
      changeTodo(editId, text);
    } else {
      addTodo(text);
    }

    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
    setEditId(null);
    setText("");
  }

  useEffect(() => {
    if (editId) {
      setOpen(true);
      const todo = list.find((item) => item.id === editId);
      if (todo) {
        setText(todo.title);
      }
    }
  }, [editId, list]);

  return (
    <div>
      <div className={`${st.root} ${open ? st.active : ""}`}>
        <div className={st.container}>
          <h2>{editId ? "Edit Note" : "New Note"}</h2>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Input your note..."
          />
          <div className={st.row}>
            <button className={st.cancel} onClick={handleCancel}>
              Cancel
            </button>
            <button onClick={handleSubmit}>Apply</button>
          </div>
        </div>
      </div>
      <div className={st.open} onClick={() => setOpen(true)}>
        <img src={plus} alt="" />
      </div>
    </div>
  );
}
