//Selectors
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const selectButton = document.querySelector(".select__button");
const select = document.querySelector(".select__filter");

//Event Listeners
document.addEventListener("DOMContentLoaded", getLocalStorage);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteComplete);
select.addEventListener("change", filtersDisplay);

//Functions
function addTodo(event) {
  event.preventDefault();

  //Check input value
  if (todoInput.value.length === 0) return;

  //Create Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo__div");
  todoList.appendChild(todoDiv);

  //Create element
  const todoElement = document.createElement("li");
  todoElement.innerHTML = todoInput.value;
  todoElement.classList.add("div__element");
  todoDiv.appendChild(todoElement);

  //Create completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("element__button--completed");
  todoDiv.appendChild(completedButton);

  //Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("element__button--delete");
  todoDiv.appendChild(deleteButton);

  //Adding a background to the list
  if (todoDiv !== null) {
    todoList.classList.add("todo__list--js");
    selectButton.parentElement.classList.remove("hide");
  }

  //Filter creation
  selectButton.innerHTML = '<i class="fas fa-filter"></i>';
  select.classList.add("select__filter--display");

  //Local Storage call
  saveLocally(todoInput.value);

  //Clear the input
  todoInput.value = "";
}

//Delete and Complete functionality
function deleteComplete(e) {
  const clickItem = e.target;
  if (clickItem.classList[0] === "element__button--delete") {
    const clickItemParent = clickItem.parentElement;
    //Animation await, remove item
    clickItemParent.classList.add("button__delete--animation");
    removeLocalStorage(clickItemParent);
    clickItemParent.addEventListener("transitionend", function () {
      if (todoList.lastElementChild.className === "select__container") {
        todoList.classList.remove("todo__list--js");
        selectButton.parentElement.classList.add("hide");
      }
      clickItemParent.remove();
    });
  }

  if (clickItem.classList[0] === "element__button--completed") {
    clickItem.parentElement.classList.toggle("button__completed--modifier");
    selectButton.parentElement.classList.add("hide");
  }
}

//Filtering functionality
function filtersDisplay() {
  const todoTasks = todoList.children;
  switch (select.value) {
    case "all":
      for (i = 0; i < todoTasks.length; i++) {
        todoTasks[i].classList.remove("hide");
      }
      break;
    case "completed":
      for (i = 0; i < todoTasks.length; i++) {
        if (!todoTasks[i].classList.contains("button__completed--modifier")) {
          todoTasks[i].classList.add("hide");
        } else {
          todoTasks[i].classList.remove("hide");
          selectButton.parentElement.classList.remove("hide");
        }
      }
      break;
    case "uncompleted":
      for (i = 0; i < todoTasks.length; i++) {
        if (todoTasks[i].classList.contains("button__completed--modifier")) {
          todoTasks[i].classList.add("hide");
        } else {
          todoTasks[i].classList.remove("hide");
        }
      }
      break;
  }
}

//Local storage
function saveLocally(task) {
  //Checking storage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Get from local storage
function getLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //Create Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo__div");
    todoList.appendChild(todoDiv);

    //Create element
    const todoElement = document.createElement("li");
    todoElement.innerHTML = task;
    todoElement.classList.add("div__element");
    todoDiv.appendChild(todoElement);

    //Create completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("element__button--completed");
    todoDiv.appendChild(completedButton);

    //Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("element__button--delete");
    todoDiv.appendChild(deleteButton);

    //Adding a background to the list
    if (todoDiv !== null) {
      todoList.classList.add("todo__list--js");
    }

    //Filter creation
    selectButton.innerHTML = '<i class="fas fa-filter"></i>';
    select.classList.add("select__filter--display");
  });
}

//Remove local storage
function removeLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex, 1));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
