const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function createTaskElement(taskText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";
    li.replaceChild(input, span);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "💾";
    li.replaceChild(saveBtn, editBtn);

    saveBtn.onclick = () => {
      span.textContent = input.value;
      li.replaceChild(span, input);
      li.replaceChild(editBtn, saveBtn);
    };
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => taskList.removeChild(li);

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

addTaskBtn.onclick = () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    createTaskElement(taskText);
    taskInput.value = "";
  }
};
