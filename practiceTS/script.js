var groceryList = loadGroceries();
var itemInput = document.getElementById("itemInput");
var quantityInput = document.getElementById("quantityInput");
var addBtnscript = document.getElementById("addBtnscript");
var list = document.getElementById("groceryList");
addBtnscript.onclick = function () {
    var name = itemInput.value.trim();
    var quantity = Number(quantityInput.value.trim());
    if (name && quantity > 0) {
        groceryList.push({ name: name, quantity: quantity, bought: false });
        itemInput.value = "";
        quantityInput.value = "";
        saveGroceries();
        renderGroceries();
    }
};
function renderGroceries() {
    list.innerHTML = "";
    groceryList.forEach(function (item, index) {
        var li = document.createElement("li");
        li.className = item.bought ? "bought" : "";
        var content = document.createElement("span");
        content.textContent = "".concat(item.name, " x").concat(item.quantity);
        content.className = "item-text";
        content.ondblclick = function () {
            groceryList[index].bought = !groceryList[index].bought;
            saveGroceries();
            renderGroceries();
        };
        var editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = function () {
            var newName = prompt("New name:", item.name);
            var newQty = prompt("New quantity:", item.quantity.toString());
            if (newName && newQty && !isNaN(Number(newQty))) {
                groceryList[index].name = newName;
                groceryList[index].quantity = Number(newQty);
                saveGroceries();
                renderGroceries();
            }
        };
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.onclick = function () {
            groceryList.splice(index, 1);
            saveGroceries();
            renderGroceries();
        };
        li.appendChild(content);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}
function saveGroceries() {
    localStorage.setItem("groceries", JSON.stringify(groceryList));
}
function loadGroceries() {
    var data = localStorage.getItem("groceries");
    return data ? JSON.parse(data) : [];
}
