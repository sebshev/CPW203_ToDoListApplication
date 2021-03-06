var picker = datepicker("#dueDate");
var toDoItem = (function () {
    function toDoItem() {
    }
    return toDoItem;
}());
window.onload = function () {
    var addItemBtn = document.getElementById("addItemBtn");
    addItemBtn.onclick = main;
    loadSavedToDoItems();
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var item = new toDoItem();
    var titleInput = getInput("title");
    item.title = titleInput.value;
    var dueDateInput = getInput("dueDate");
    item.dueDate = new Date(dueDateInput.value);
    var isCompleteInput = getInput("isComplete");
    item.isComplete = isCompleteInput.checked;
    return item;
}
function getInput(id) {
    return document.getElementById(id);
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("complete");
}
function displayToDoItem(item) {
    var itemText = document.createElement("h4");
    itemText.innerText = item.title;
    var itemDueDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDueDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    if (item.isComplete) {
        itemDiv.classList.add("complete");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDueDate);
    itemDiv.onclick = markAsComplete;
    if (item.isComplete) {
        var completeItems = getInput("completeItems");
        completeItems.appendChild(itemDiv);
    }
    else {
        var incompleteItems = getInput("incompleteItems");
        incompleteItems.appendChild(itemDiv);
    }
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem("toDo", currItemsString);
}
function getToDoItems() {
    var itemString = localStorage.getItem("toDo");
    var item = JSON.parse(itemString);
    return item;
}
function loadSavedToDoItems() {
    var items = getToDoItems();
    for (var i = 0; i < items.length; i++) {
        displayToDoItem(items[i]);
    }
}
