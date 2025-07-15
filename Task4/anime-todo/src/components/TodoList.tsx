import React, { useState } from "react";
import TodoService from "../TodoService";
import type { TodoTypes } from "../todo";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoID, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = () => {
    if (editingTodoID !== null) {
      const updatedTodo = {
        id: editingTodoID,
        title: editedTodoText,
        completed:
          todos.find((todo) => todo.id === editingTodoID)?.completed || false,
      };
      TodoService.updateTodo(updatedTodo);
      setTodos(TodoService.getTodos());
      handleEditCancel();
    }
  };

  const handleDelete = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos(TodoService.getTodos());
  };

  const handleToggleComplete = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      TodoService.updateTodo(updatedTodo);
      setTodos(TodoService.getTodos());
    }
  };

  return (
    <div className="todoContainer anime-container">
      <TodoForm setTodos={setTodos} />
      <div className="anime-list">
        {todos.map((todo) => (
          <div key={todo.id} className={`todoItem anime-item ${todo.completed ? "completed" : ""}`}>
            {editingTodoID === todo.id ? (
              <div className="anime-edit">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  className="anime-input"
                />
                <button onClick={handleEditSave} className="anime-btn">Save</button>
                <button onClick={handleEditCancel} className="anime-btn">Cancel</button>
              </div>
            ) : (
              <div className="anime-view">
                <span
                  className="anime-title"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => handleEditStart(todo.id, todo.title)} className="anime-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(todo.id)} className="anime-btn">Delete</button>
                <button onClick={() => handleToggleComplete(todo.id)} className="anime-btn">
                  {todo.completed ? "Uncomplete" : "Complete"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
