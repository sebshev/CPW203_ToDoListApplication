var picker = datepicker("#dueDate");
var toDoItem = (function () {
    function toDoItem() {
    }
    return toDoItem;
}());
window.onload = function () {
    var addItemBtn = document.getElementById("addItemBtn");
    addItemBtn.onclick = main;
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
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
    itemDueDate.innerText = getInput("dueDate").value.toString();
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
