interface GroceryItem {
  name: string;
  quantity: number;
  bought: boolean;
}
let groceryList: GroceryItem[] = loadGroceries();

const itemInput = document.getElementById("itemInput") as HTMLInputElement;
const quantityInput = document.getElementById("quantityInput") as HTMLInputElement;
const addBtnscript = document.getElementById("addBtnscript") as HTMLButtonElement;
const list = document.getElementById("groceryList") as HTMLUListElement;

addBtnscript.onclick = () => {
  const name = itemInput.value.trim();
  const quantity = Number(quantityInput.value.trim());

  if (name && quantity > 0) {
    groceryList.push({ name, quantity, bought: false });
    itemInput.value = "";
    quantityInput.value = "";
    saveGroceries();
    renderGroceries();
  }
};
function renderGroceries(): void {
  list.innerHTML = "";

  groceryList.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = item.bought ? "bought" : "";

    const content = document.createElement("span");
    content.textContent = `${item.name} x${item.quantity}`;
    content.className = "item-text";

    content.ondblclick = () => {
      groceryList[index].bought = !groceryList[index].bought;
      saveGroceries();
      renderGroceries();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      const newName = prompt("New name:", item.name);
      const newQty = prompt("New quantity:", item.quantity.toString());

      if (newName && newQty && !isNaN(Number(newQty))) {
        groceryList[index].name = newName;
        groceryList[index].quantity = Number(newQty);
        saveGroceries();
        renderGroceries();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
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

function loadGroceries(): GroceryItem[] {
  const data = localStorage.getItem("groceries");
  return data ? JSON.parse(data) : [];
}
