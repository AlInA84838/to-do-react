import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import List from "./components/list/List";
import Modal from "./components/modal/Modal";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [list, setList] = useState<Todo[]>(getTodoList());
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  function getTodoList() {
    const saveList = localStorage.getItem("todoList");
    if (saveList) {
      return JSON.parse(saveList);
    } else {
      return [];
    }
  }

  function changeTodo(id: number, text: string) {
    setList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.title = text;
        }
        return item;
      })
    );
  }

  function editTodo(id: number) {
    setEditId(id);
  }

  function deleteTodo(id: number) {
    setList((prev) => prev.filter((item) => item.id != id));
  }

  function completeTodo(id: number) {
    setList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      })
    );
  }

  function addTodo(text: string) {
    setList((prev) => [
      ...prev,
      { id: Date.now(), title: text, completed: false },
    ]);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function filterList() {
    let selectList = list;
    if (filter === "complete") {
      selectList = list.filter((item) => item.completed);
    } else if (filter === "incomplete") {
      selectList = list.filter((item) => !item.completed);
    }
    const newList = selectList.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    return newList;
  }

  const filteredList = filterList();

  return (
    <div className={theme === "dark" ? "body dark" : "body"}>
      <div className="container">
        <Header
          toggleTheme={toggleTheme}
          theme={theme}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
        <List
          list={filteredList}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
        <Modal
          list={filteredList}
          setEditId={setEditId}
          editId={editId}
          addTodo={addTodo}
          changeTodo={changeTodo}
        />
      </div>
    </div>
  );
}

export default App;
