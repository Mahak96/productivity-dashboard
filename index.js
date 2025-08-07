let greeting = document.getElementById("greeting");
let quote = document.getElementById("quote");
let QuoteBtn = document.getElementById("new-quote");
let body = document.body;
let tasksList = document.getElementById("tasks");
let input = document.getElementById("input");
let addBtn = document.getElementById("taskbut");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Greeting based on time
let date = new Date();
let hours = date.getHours();

if (hours >= 0 && hours < 12) {
  greeting.innerHTML = "☀️ GOOD MORNING";
} else if (hours >= 12 && hours < 18) {
  greeting.innerHTML = "🌤️ GOOD AFTERNOON";
} else {
  greeting.innerHTML = "🌙 GOOD EVENING";
}

// Quotes
const quotesArray = [
  "Push yourself, because no one else is going to do it for you.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Great things never come from comfort zones.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "It always seems impossible until it’s done.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream big. Work hard. Stay focused.",
  "Discipline is the bridge between goals and accomplishment."
];

function showRandomQuote() {
  let index = Math.floor(Math.random() * quotesArray.length);
  quote.innerText = quotesArray[index];
}
QuoteBtn.addEventListener("click", showRandomQuote);

// Add Task
addBtn.addEventListener("click", function () {
  let taskText = input.value.trim();
  if (taskText === "") return;

  let taskObj = { task: taskText, completed: false };
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToList(taskObj);
  input.value = "";
});

function addTaskToList(taskObj, index = tasks.length - 1) {
  let newItem = document.createElement("li");
  newItem.className = "list-group-item";

  newItem.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <input type="checkbox" class="complete-checkbox" ${taskObj.completed ? "checked" : ""}> ${taskObj.task}
      </div>
     <button class="btn btn-sm delete-btn">🗑️</button>
    </div>`;

  // Delete task
  newItem.querySelector(".delete-btn").addEventListener("click", function () {
    newItem.remove();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    reloadTasks(); // optional to refresh the order
  });

  // Mark complete
  newItem.querySelector(".complete-checkbox").addEventListener("change", function (e) {
    tasks[index].completed = e.target.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  tasksList.appendChild(newItem);
}

function loadTasksFromStorage() {
  tasksList.innerHTML = ""; // Clear old
  tasks.forEach((taskObj, index) => addTaskToList(taskObj, index));
}

function reloadTasks() {
  loadTasksFromStorage(); // Simple wrapper
}

// Initial Load
loadTasksFromStorage();
