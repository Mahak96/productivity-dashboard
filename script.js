
let toggleSwitch = document.getElementById("checkNativeSwitch");
let toggleLabel = document.getElementById("toggleLabel");
let list = document.getElementsByClassName("list-group-item");
body = document.body;
textarea = document.getElementById("floatingTextarea2");
window.onload = () => {
  const dark = localStorage.getItem("darkMode");
  if (dark === "true") {
    toggleSwitch.checked = true;
    enableDarkMode();
  }
};

toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

function enableDarkMode() {
  body.classList.add("dark-mode", "bg-dark", "text-light");
  body.style.backgroundColor = "black";
  body.style.color = "white";
  toggleLabel.textContent = "Light Mode";
  toggleLabel.classList.remove("text-dark");
  toggleLabel.classList.add("text-light");
  toggleLabel.style.color = "white";
  if (textarea) textarea.style.backgroundColor = "gray";
  localStorage.setItem("darkMode", "true");
}

function disableDarkMode() {
  body.classList.remove("dark-mode", "bg-dark", "text-light");
  body.style.backgroundColor = "white";
  body.style.color = "black";
  toggleLabel.textContent = "Dark Mode";
  toggleLabel.classList.remove("text-light");
  toggleLabel.classList.add("text-dark");
  toggleLabel.style.color = "black";
  if (textarea) textarea.style.backgroundColor = "white";
  localStorage.setItem("darkMode", "false");
}
