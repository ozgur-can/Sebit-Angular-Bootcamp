const list = document.getElementById("todoCard__list");
const addItemButton = document.getElementById("todoCard__addNewItemButton");
const completedCounter = document.getElementById("todoCard__completedItemCounter");
const itemCounter = document.getElementById("todoCard_itemCounter");

// listeners for add new todo item
document.addEventListener("keyup", (event) => event.key === "Enter" && addItemButtonOnClick());
addItemButton.addEventListener("click", addItemButtonOnClick);

function addItemButtonOnClick() {
  // access input DOM
  const inputBox = document.getElementById("todoCard__inputBox");

  // stop if input value is empty
  if (inputBox && !inputBox.value) {
    return;
  }

  // get last todo item index
  const lastTodoItemIndex = todoItems[todoItems.length - 1].id;

  const itemId = lastTodoItemIndex + 1;

  // create li item with id and text
  createDOMItem(itemId, inputBox.value, false);

  // push new todo into todoItems array
  todoItems.push({ id: itemId, text: inputBox.value, isCompleted: false });

  // clear input value
  inputBox.value = "";

  // update item counter
  itemCounter.textContent = parseInt(itemCounter.textContent) + 1;
}

// todoItems array
const todoItems = [
  {
    id: 1,
    text: "Do some exercise",
    isCompleted: false,
  },
  {
    id: 2,
    text: "Read some book",
    isCompleted: false,
  },
  {
    id: 3,
    text: "Learn Angular",
    isCompleted: true,
  },
  {
    id: 4,
    text: "Buy milk",
    isCompleted: false,
  },
  {
    id: 5,
    text: "Create to-do list app",
    isCompleted: true,
  },
];

// create li element and inserts into our ul
function createDOMItem(itemId, itemText, isCompleted) {
  // create li element
  const element = document.createElement("li");

  // add style to li element
  element.classList.add("todoCard__item");

  // set itemId value into DOM element to update its isComplete value later
  element.setAttribute("itemId", itemId);

  // dom element for item text value
  const textSpan = document.createElement("span");
  textSpan.textContent = itemText;

  // parent dom element for checkbox & delete button
  const todoItemButtons = document.createElement("div");

  // checkbox input with onClick event
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", () => updateDOMItem(itemId));

  // delete button with onClick event
  const deleteButton = document.createElement("button");
  const deleteButtonText = document.createTextNode("del");
  deleteButton.appendChild(deleteButtonText);
  deleteButton.addEventListener("click", () => deleteDOMItem(itemId));

  // checkbox & delete button
  todoItemButtons.appendChild(checkbox);
  todoItemButtons.appendChild(deleteButton);

  // item text & delete button
  element.appendChild(textSpan);
  element.appendChild(todoItemButtons);

  // add this li element into list
  list.appendChild(element);

  // update style & input check & completedCounter if task is already completed
  if (isCompleted) {
    const domItem = [...list.children].find((item) => item.getAttribute("itemId") == itemId);
    domItem.classList.add("todoCard__item--completed");

    checkbox.checked = true;
    completedCounter.textContent = parseInt(completedCounter.textContent, 10) + 1;
  }
}

// show items in todo card
function renderItems() {
  todoItems.forEach((item) => createDOMItem(item.id, item.text, item.isCompleted));
  itemCounter.textContent = list.children.length;
}

function updateDOMItem(itemId) {
  // access item with itemId
  const item = todoItems.find((item) => item.id === itemId);

  // exit if item doesn't exist
  if (!item) {
    return;
  }

  // access dom item that will be updated
  const itemStatus = changeItemStatus(item);
  const domItem = [...list.children].find((item) => item.getAttribute("itemId") == itemId);

  // add or remove 'todoCard__item--completed' class & update completed counter
  if (itemStatus) {
    domItem.classList.add("todoCard__item--completed");
    completedCounter.textContent = parseInt(completedCounter.textContent, 10) + 1;
  } else {
    domItem.classList.remove("todoCard__item--completed");
    completedCounter.textContent = parseInt(completedCounter.textContent, 10) - 1;
  }
}

function changeItemStatus(todoItem) {
  return (todoItem.isCompleted = !todoItem.isCompleted);
}

// delete dom item with id
function deleteDOMItem(itemId) {
  // access dom item with itemId
  const domItem = [...list.children].find((item) => item.getAttribute("itemId") == itemId);

  // exit if dom item doesn't exist
  if (!domItem) {
    return;
  }

  // remove dom item
  domItem.remove();

  // find item in todoItems array
  const item = todoItems.find((it) => it.id === itemId);

  // update counters
  if (item.isCompleted) {
    completedCounter.textContent = parseInt(completedCounter.textContent, 10) - 1;
  }
  itemCounter.textContent = list.children.length;
}

// show items on todo card
renderItems();
