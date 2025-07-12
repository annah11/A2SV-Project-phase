var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var tasks = loadTasks();
addBtn.onclick = function () {
    var text = taskInput.value.trim();
    if (text !== "") {
        tasks.push({ text: text, done: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
};
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        var li = document.createElement("li");
        // 👇 Create the task content div
        var content = document.createElement("div");
        content.className = "task-content";
        content.textContent = task.text;
        // ✅ Toggle done on click (but not while editing)
        content.onclick = function () {
            if (!li.classList.contains("editing")) {
                tasks[index].done = !tasks[index].done;
                saveTasks();
                renderTasks();
            }
        };
        // ✏️ Edit Button
        var editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.className = "edit";
        editBtn.onclick = function (e) {
            e.stopPropagation();
            li.classList.add("editing");
            // Create input field with existing text
            var input = document.createElement("input");
            input.type = "text";
            input.value = task.text;
            input.className = "edit-input";
            input.autofocus = true;
            // Save button
            var saveBtn = document.createElement("button");
            saveBtn.textContent = "💾";
            saveBtn.className = "save";
            saveBtn.onclick = function () {
                var newText = input.value.trim();
                if (newText !== "") {
                    tasks[index].text = newText;
                    saveTasks();
                    renderTasks();
                }
            };
            // Cancel button
            var cancelBtn = document.createElement("button");
            cancelBtn.textContent = "❌";
            cancelBtn.className = "cancel";
            cancelBtn.onclick = function () { return renderTasks(); };
            // Replace content with input
            li.innerHTML = "";
            li.appendChild(input);
            li.appendChild(saveBtn);
            li.appendChild(cancelBtn);
        };
        // 🗑️ Delete Button
        var delBtn = document.createElement("button");
        delBtn.textContent = "🗑️";
        delBtn.className = "del";
        delBtn.onclick = function (e) {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };
        // 🎨 Add elements to <li>
        if (task.done)
            li.classList.add("done");
        li.appendChild(content);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}
function saveTasks() {
    localStorage.setItem("animeTodo", JSON.stringify(tasks));
}
function loadTasks() {
    var saved = localStorage.getItem("animeTodo");
    return saved ? JSON.parse(saved) : [];
}
renderTasks();
