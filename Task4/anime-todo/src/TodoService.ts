import type { TodoTypes } from "./todo";
const LOCAL_STORAGE_KEY = "todos";
const TodoService = {
    getTodos: (): TodoTypes[] => {
        const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todos ? JSON.parse(todos) : [];
    },

    saveTodos: (todos: TodoTypes[]): void => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    },

    addTodo: (todo: TodoTypes): void => {
        const todos = TodoService.getTodos();
        todos.push(todo);
        TodoService.saveTodos(todos);
    },

    updateTodo: (updatedTodo: TodoTypes): void => {
        const todos = TodoService.getTodos();
        const index = todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
            todos[index] = updatedTodo;
            TodoService.saveTodos(todos);
        }
    },

    deleteTodo: (id: number): void => {
        const todos = TodoService.getTodos();
        const filteredTodos = todos.filter(todo => todo.id !== id);
        TodoService.saveTodos(filteredTodos);
    }
    
}
export default TodoService;