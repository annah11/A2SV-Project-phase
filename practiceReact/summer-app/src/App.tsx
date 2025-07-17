import { useState } from "react";
type TodoList = {
  text: string;
  done: boolean;
};
function App() {
  const [task, setTask] = useState("");

  const [todoList, setTodoList] = useState<TodoList[]>([]);
  function handleAdd() {
    if (!task.trim()) return;
    setTodoList([...todoList, { text: task, done: false }]);
    setTask("");
  }
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1> 😁 Hana's Todo List</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a funny task u have"
        style={{
          padding: "10px",
          width: "60%",
          borderRadius: "7px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleAdd}
        style={{
          marginLeft: "10px",
          padding: "10px",
          background: "#d63384",
          color: "white",
          borderRadius: "8px",
          border: "none",
        }}
      >
        ➕ Add
      </button>
      <div style={{ marginTop: "20px" }}>
        {todoList.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              textDecoration: item.done ? "line-through" : "none",
              backgroundColor: item.done ? "#d1e7dd" : "#f8f9fa",
              cursor: "pointer",
            }}
          >
          
            <p
              onDoubleClick={() => {
                const updatedList = [...todoList];
                updatedList[index].done = !updatedList[index].done;
                setTodoList(updatedList);
              }}
            >
              📌{item.text}
            </p>
            <button
              onClick={() => {
                const filtered = todoList.filter((_, i) => i !== index);
                setTodoList(filtered);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#d63384",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              🧺
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
