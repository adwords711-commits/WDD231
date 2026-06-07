// storage.js
let tasks = [];

function taskTemplate(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>`
}

function renderTasks(tasks) {
  // get the list element from the DOM
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = "";
  // loop through the tasks array. transform (map) each task object into the appropriate HTML to represent a to-do.
  const html = tasks.map(taskTemplate).join("");
  listElement.innerHTML = html;
}

function newTask() {
  // get the value entered into the #todo input
  const task = document.querySelector("#todo").value;
  // add it to our arrays tasks
  tasks.push({ detail: task, completed: false });
  // Saves the updated tasks array into locaStorage
  setLocalStorage("tasks", tasks);
  // render out the list
  renderTasks(tasks);
}

function removeTask(taskElement) {
  // Notice how we are using taskElement instead of document as our starting point?
  // This will restrict our search to the element instead of searching the whole document.
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector('p').innerText
  );
  // Saves the updated tasks array
  setLocalStorage("tasks", tasks);
  taskElement.remove();
}

function completeTask(taskElement) {
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  tasks[taskIndex].completed = tasks[taskIndex].completed ? false : true;
  // Saves the updateed tasks array
  setLocalStorage("tasks", tasks);
  taskElement.classList.toggle("strike");
  console.log(tasks);
}

function manageTasks(e) {
  // did they click the delete or complete icon?
  console.log(e.target);
  const parent = e.target.closest("li");
  if (e.target.dataset.action === "delete") {
    removeTask(parent);
  }
  if (e.target.dataset.action === "complete") {
    completeTask(parent);
  }
}
function saveUser() {
    const username = document.querySelector("#username").value;

    localStorage.setItem("todo-user", username);

    document.querySelector(".user").innerText = username;
}
function setUser() {
    const saveUser = localStorage.getItem("todo-user");
    if (saveUser) {
        document.querySelector(".user").innerText = saveUser;
    }
}
function setLocalStorage(key, data) {
  const stringData = JSON.stringify(data);
  localStorage.setItem(key, stringData);
}
function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}
function init() {
  // Load saved tasks from localStorage
  const storedTasks = getLocalStorage("tasks");

  if (storedTasks) {
    tasks = storedTasks;
  }

  // Display tasks on the page
  renderTasks(tasks);

  // Load saved username
  setUser();
}

// Event listeners (run once when script loads)
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);
document.querySelector("#saveUser").addEventListener("click", saveUser);

init();