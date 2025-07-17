import {FaPen,FaClipboardList} from "react-icons/fa";
import TodoList from "./components/TodoList";
import React from "react";


const App: React.FC = () => {
  return (
    <div className="App anime-app">
      <div className="header anime-header">
        <div className="logoside anime-logo">
          <FaPen/>
          <h1>What To do</h1>
          <FaClipboardList/>
        </div>
      </div>
      <TodoList />
    </div>
  );
}

export default App