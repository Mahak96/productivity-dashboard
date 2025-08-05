let habit = document.getElementById("habit");
let addbtn = document.getElementById("button");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let input = document.getElementById("input");

loadTasksFromStorage();

addbtn.addEventListener("click", function () {
  let taskText = input.value.trim();
  if (taskText === "") return;

  let taskObj = { task: taskText, completed: false };
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToTable(taskObj);
  input.value = "";
});

function addTaskToTable(taskObj, index = tasks.length - 1) {
  let newRow = document.createElement("li");
  newRow.className = "list-group-item";
  newRow.innerHTML = `
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <input type="checkbox" class="complete-checkbox"${taskObj.completed ? "checked" : ""}> ${taskObj.task}
    </div>
    <button class="btn btn-danger btn-sm delete-btn">🗑️</button>
  </div>
`;

  newRow.querySelector(".delete-btn").addEventListener("click", function () {
    newRow.remove();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

  });
  newRow.querySelector(".complete-checkbox").addEventListener("change", function (e) {
    tasks[index].completed = e.target.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  habit.appendChild(newRow);

}
function loadTasksFromStorage() {
  tasks.forEach((taskObj, index) => addTaskToTable(taskObj, index));
}

