// --- Selectors ---
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const todoForm = document.getElementById("todoForm");
const charCount = document.getElementById("charCount");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("themeToggle");

// --- State ---
let tasks = [];
let filter = "all";
let dragSrcIndex = null;

// --- LocalStorage ---
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const data = localStorage.getItem("tasks");
  tasks = data ? JSON.parse(data) : [];
}
function saveTheme() {
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}
function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("dark");
}

// --- Utils ---
function createTaskObj(text, priority, dueDate) {
  return {
    id: Date.now() + Math.random(),
    text,
    completed: false,
    priority,
    dueDate,
  };
}
function getPriorityClass(priority) {
  return "priority-" + priority;
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

// --- Render ---
function renderTasks() {
  taskList.innerHTML = "";
  let filtered = tasks;
  if (filter === "active") filtered = tasks.filter((t) => !t.completed);
  if (filter === "completed") filtered = tasks.filter((t) => t.completed);
  filtered.forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.setAttribute("draggable", "true");
    li.dataset.index = idx;

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });
    li.appendChild(checkbox);

    // Task text (editable)
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    li.appendChild(span);

    // Meta info
    const meta = document.createElement("div");
    meta.className = "task-meta";
    const prio = document.createElement("span");
    prio.className = getPriorityClass(task.priority);
    prio.textContent =
      task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    meta.appendChild(prio);
    if (task.dueDate) {
      const due = document.createElement("span");
      due.className = "due-date";
      due.textContent = formatDate(task.dueDate);
      meta.appendChild(due);
    }
    li.appendChild(meta);

    // Actions
    const actions = document.createElement("div");
    actions.className = "task-actions";
    // Edit
    const editBtn = document.createElement("button");
    editBtn.title = "Edit";
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => startEditTask(task, li, span);
    actions.appendChild(editBtn);
    // Delete
    const delBtn = document.createElement("button");
    delBtn.title = "Delete";
    delBtn.innerHTML = "🗑️";
    delBtn.onclick = () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    };
    actions.appendChild(delBtn);
    li.appendChild(actions);

    // Drag events
    li.addEventListener("dragstart", (e) => {
      li.classList.add("dragging");
      dragSrcIndex = idx;
    });
    li.addEventListener("dragend", (e) => {
      li.classList.remove("dragging");
      dragSrcIndex = null;
    });
    li.addEventListener("dragover", (e) => {
      e.preventDefault();
      li.style.background = "var(--secondary)";
    });
    li.addEventListener("dragleave", (e) => {
      li.style.background = "";
    });
    li.addEventListener("drop", (e) => {
      li.style.background = "";
      if (dragSrcIndex !== null && dragSrcIndex !== idx) {
        const moved = tasks.splice(dragSrcIndex, 1)[0];
        tasks.splice(idx, 0, moved);
        saveTasks();
        renderTasks();
      }
    });

    taskList.appendChild(li);
  });
}

// --- Add/Edit Task ---
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  const priority = priorityInput.value;
  const dueDate = dueDateInput.value;
  tasks.push(createTaskObj(text, priority, dueDate));
  saveTasks();
  renderTasks();
  todoForm.reset();
  charCount.textContent = "0/100";
});

function startEditTask(task, li, span) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.maxLength = 100;
  input.className = "edit-input";
  input.style.flex = "1";
  span.replaceWith(input);
  input.focus();
  // Save button
  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = "💾";
  saveBtn.title = "Save";
  saveBtn.onclick = () => {
    const newText = input.value.trim();
    if (newText) {
      task.text = newText;
      saveTasks();
      renderTasks();
    }
  };
  // Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.innerHTML = "✖️";
  cancelBtn.title = "Cancel";
  cancelBtn.onclick = () => renderTasks();
  const actions = li.querySelector(".task-actions");
  actions.innerHTML = "";
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveBtn.click();
    if (e.key === "Escape") cancelBtn.click();
  });
}

// --- Character Counter ---
taskInput.addEventListener("input", () => {
  charCount.textContent = `${taskInput.value.length}/100`;
});

// --- Filters ---
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    renderTasks();
  });
});

// --- Theme Toggle ---
function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateThemeIcon();
  saveTheme();
});

// --- Init ---
loadTasks();
loadTheme();
updateThemeIcon();
renderTasks();
