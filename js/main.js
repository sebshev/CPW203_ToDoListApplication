var picker = datepicker("#dueDate");
var toDoItem = (function () {
    function toDoItem() {
    }
    return toDoItem;
}());
window.onload = function () {
    var addItemBtn = document.getElementById("addItemBtn");
    addItemBtn.onclick = main;
    loadSavedToDo();
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
    var itemString = JSON.stringify(item);
    localStorage.setItem("toDo", itemString);
}
function getToDo() {
    var itemString = localStorage.getItem("toDo");
    var item = JSON.parse(itemString);
    return item;
}
function loadSavedToDo() {
    var item = getToDo();
    displayToDoItem(item);
}
