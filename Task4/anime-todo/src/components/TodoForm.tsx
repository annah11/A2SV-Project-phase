import React, { useState } from 'react';
import TodoService from '../TodoService';
import type { TodoTypes } from '../todo';

interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<TodoFormProps> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") return;
    const todo: TodoTypes = {
      id: Date.now(),
      title: newTodoText,
      completed: false,
    };
    TodoService.addTodo(todo);
    setTodos(TodoService.getTodos());
    setNewTodoText("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  return (
    <div className="todoForm anime-form">
      <input
        type="text"
        value={newTodoText}
        onChange={handleInputChange}
        placeholder="Add a new todo"
        className="anime-input"
      />
      <button onClick={handleAddTodo} className="anime-btn">Add Todo</button>
    </div>
  );
};

export default TodoForm;