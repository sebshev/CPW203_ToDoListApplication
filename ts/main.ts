// @ts-ignore
const picker = datepicker("#dueDate");

class toDoItem {
    title:string;
    dueDate:Date;
    isComplete:boolean
}

window.onload = function(){
    let addItemBtn = document.getElementById("addItemBtn");
    addItemBtn.onclick = main;
    //load saved item
    loadSavedToDo();
}

function main(){
    if (isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item)
    }
}

/**
 * Checks form data for validation
 */
function isValid():boolean{
    return true;
}

/**
 * Gets the item from object
 */
function getToDoItem():toDoItem{
    //create object within function
    let item = new toDoItem();

    //get title
    let titleInput = getInput("title");
    item.title = titleInput.value;

    //get due date
    let dueDateInput = getInput("dueDate");
    item.dueDate = new Date(dueDateInput.value);

    //get isComplete
    let isCompleteInput = getInput("isComplete");
    item.isComplete = isCompleteInput.checked;


    return item;
}

function getInput(id):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}
/**
 * Displays item on web page
 * @param item 
 */
function displayToDoItem(item:toDoItem):void{
    // puts To Do Item into a h4 element
    let itemText = document.createElement("h4");
    itemText.innerText = item.title;

    // puts the due date into a p element
    let itemDueDate = document.createElement("p");

    // itemDueDate.innerText = getInput("dueDate").value.toString();
    // itemDueDate.innerText = item.dueDate.toString();
    let dueDate = new Date(item.dueDate.toString());
    itemDueDate.innerText = dueDate.toDateString();

    // creates a div to store the previous 2 elements into
    let itemDiv = document.createElement("div");
    if (item.isComplete) {
        itemDiv.classList.add("complete");
    }

    // appends the previous elements to the div as children
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDueDate);

    if (item.isComplete) {
        let completeItems = getInput("completeItems");
        completeItems.appendChild(itemDiv);
    }
    else{
        let incompleteItems = getInput("incompleteItems");
        incompleteItems.appendChild(itemDiv);
    }
}

// store items in web storage

function saveToDo(item:toDoItem):void{
    // convert object into string to store
    let itemString = JSON.stringify(item);

    localStorage.setItem("toDo", itemString);
}

function getToDo():toDoItem{
    let itemString = localStorage.getItem("toDo");
    let item:toDoItem = JSON.parse(itemString);
    return item;
}
function loadSavedToDo(){
    let item = getToDo(); // reads from storage
    displayToDoItem(item);
}