// seleçao de elementos
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// funçoes
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  list.appendChild(todo);
  input.value = "";
  input.focus();
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  form.classList.toggle("hide");
  list.classList.toggle("hide");
};

const update = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

// evento
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = input.value;
  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targeEl = e.target;
  const parentEl = targeEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targeEl.classList.contains("finish")) {
    parentEl.classList.toggle("done");
  }
  if (targeEl.classList.contains("edit")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
  if (targeEl.classList.contains("remove")) {
    parentEl.remove();
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    update(editInputValue);
  }

  toggleForms();
});
