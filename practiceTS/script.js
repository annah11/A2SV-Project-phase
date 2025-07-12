var input = document.getElementById('itemInput');
var addButton = document.getElementById('addItemButton');
var groceryList = document.getElementById('groceryList');
var groceries = [];
addButton.onclick = function () {
    var item = input.value.trim();
    if (item !== '') {
        groceries.push(item);
        renderList();
        input.value = '';
    }
};
function renderList() {
    groceryList.innerHTML = '';
    groceries.forEach(function (item, index) {
        var li = document.createElement('li');
        li.textContent = item;
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            groceries.splice(index, 1);
            renderList();
        };
        li.appendChild(deleteButton);
        groceryList.appendChild(li);
    });
}
