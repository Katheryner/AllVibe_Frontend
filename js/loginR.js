const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-activeM");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-activeM");
});

const modal = document.getElementById("modalContent");
const logR = document.getElementById("logR");
const logClosed = document.getElementById("logC");
const logC = document.getElementById("logCd");

logR.addEventListener("click", (e) => {
  console.log("object");
  e.preventDefault();

  if (
    modal.classList.contains("initial_disabled") ||
    modal.classList.contains("disebled_")
  ) {
    modal.classList.remove("initial_disabled");
    modal.classList.add("disebled_");
    modal.classList.add("action_look");
  }
});
logClosed.addEventListener("click", (e) => {
  console.log("object");
  e.preventDefault();
  if (modal.classList.contains("action_look")) {
    modal.classList.add("initial_disabled");
    modal.classList.remove("action_look");
  }
});
logC.addEventListener("click", (e) => {
  console.log("object");
  e.preventDefault();
  if (modal.classList.contains("action_look")) {
    modal.classList.add("initial_disabled");
    modal.classList.remove("action_look");
  }
});
