const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

interface Task {
  text: string;
  done: boolean;
}

let tasks: Task[] = loadTasks(); 

addBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, done: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
};

function renderTasks(): void {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const content = document.createElement("div");
    content.className = "task-content";
    content.textContent = task.text;

    content.ondblclick = () => {
    if (!li.classList.contains("editing")) {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
    }
    };


    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "edit";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      li.classList.add("editing");

      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.className = "edit-input";
      input.autofocus = true;

      // Save button
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "💾";
      saveBtn.className = "save";
      saveBtn.onclick = () => {
        const newText = input.value.trim();
        if (newText !== "") {
          tasks[index].text = newText;
          saveTasks();
          renderTasks();
        }
      };

      // Cancel button
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "❌";
      cancelBtn.className = "cancel";
      cancelBtn.onclick = () => renderTasks();

      // Replace content with input
      li.innerHTML = "";
      li.appendChild(input);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
    };

    // 🗑️ Delete Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.className = "del";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    // 🎨 Add elements to <li>
    if (task.done) li.classList.add("done");
    li.appendChild(content);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasks(): void {
  localStorage.setItem("animeTodo", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const saved = localStorage.getItem("animeTodo");
  return saved ? JSON.parse(saved) : [];
}

renderTasks();
