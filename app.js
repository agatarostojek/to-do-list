//Selectors
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const selectButton = document.querySelector(".select__button");
const select = document.querySelector(".select__filter");

//Event Listeners
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
  }

  //Filter creation
  selectButton.innerHTML = '<i class="fas fa-filter"></i>';
  select.classList.add("select__filter--display");

  //Clear the input
  todoInput.value = "";
}

function deleteComplete(e) {
  const clickItem = e.target;
  if (clickItem.classList[0] === "element__button--delete") {
    const clickItemParent = clickItem.parentElement;
    //Animation await, remove item
    clickItemParent.classList.add("button__delete--animation");
    clickItemParent.addEventListener("transitionend", function () {
      clickItemParent.remove();
      if (todoList.children.length === 0) {
        todoList.classList.remove("todo__list--js");
      }
    });
  }

  if (clickItem.classList[0] === "element__button--completed") {
    clickItem.parentElement.classList.toggle("button__completed--modifier");
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
