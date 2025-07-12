const input = document.getElementById('itemInput') as HTMLInputElement;
const addButton = document.getElementById('addItemButton') as HTMLButtonElement;
const groceryList = document.getElementById('groceryList') as HTMLUListElement;
let groceries: string[] = [];
addButton.onclick = () => {
    const item = input.value.trim();
    if (item !== '') {
        groceries.push(item);
        renderList();
        input.value = '';
        
    }
}
function renderList() {
    groceryList.innerHTML = '';
    groceries.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            groceries.splice(index, 1);
            renderList();
        };
        li.appendChild(deleteButton);
        groceryList.appendChild(li);
    });
}