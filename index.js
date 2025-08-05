let greeting = document.getElementById("greeting");
// let body = document.querySelector("body");
let quote = document.getElementById("quote");
let QuoteBtn = document.getElementById("new-quote");
let btn = document.getElementById("toggle");
let body = document.body;

//greeting
let date = new Date();
console.log(date);
let hours = date.getHours();
console.log(hours);
if (hours >= 0 && hours < 12) {
  greeting.innerHTML = "☀️ GOOD MORNING"
} else if (hours >= 12 && hours < 18) {
  greeting.innerHTML = "🌤️ GOOD AFTERNOON"
} else {
  greeting.innerHTML = "🌙 GOOD EVENING"
}
//quote generator
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

//task add
let tableBody = document.querySelector("#table tbody");
let addBtn = document.getElementById("taskbut");



let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
loadTasksFromStorage();

addBtn.addEventListener("click", function () {
  let taskText = input.value.trim();
  if (taskText === "") return;

  let taskObj = { task: taskText, completed: false };
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToTable(taskObj);
  input.value = "";
});

function addTaskToTable(taskObj, index = tasks.length - 1) {
  let newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td class="${taskObj.completed ? 'completed' : ''}">${taskObj.task}</td>
    <td><button class="delete-btn">🗑️</button></td>
    <td><button class="complete-btn">✔️</button></td>
  `;
  tableBody.appendChild(newRow);

  // Delete Button
  newRow.querySelector(".delete-btn").addEventListener("click", function () {
    newRow.remove();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  // Complete Button
  newRow.querySelector(".complete-btn").addEventListener("click", function () {
    let taskCell = newRow.querySelector("td");
    taskCell.classList.toggle("completed");


    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

function loadTasksFromStorage() {
  tasks.forEach((taskObj, index) => {
    addTaskToTable(taskObj, index);
  });
}

//toggle button
// let toggleSwitch = document.getElementById("checkNativeSwitch");
// let toggleLabel = document.getElementById("toggleLabel");

// toggleSwitch.addEventListener("change", () => {
//   if (toggleSwitch.checked) {
//     // Apply dark mode
//     body.classList.add("dark-mode");
//     body.style.backgroundColor = "black";
//     body.style.color = "white";
//     quote.style.color = "white";
//     greeting.style.color = "white";
//     toggleLabel.textContent = "Light Mode";
//     toggleLabel.classList.remove("text-dark");
//     toggleLabel.classList.add("text-light");
//     toggleLabel.style.color = "white";
//   } else {
//     // Light mode
//     body.classList.remove("dark-mode");
//     body.style.backgroundColor = "white";
//     body.style.color = "black";
//     quote.style.color = "black";
//     greeting.style.color = "black";
//     toggleLabel.textContent = "Dark Mode";
//     toggleLabel.classList.remove("text-light");
//     toggleLabel.classList.add("text-dark");
//     toggleLabel.style.color = "black";
//   }
// });


