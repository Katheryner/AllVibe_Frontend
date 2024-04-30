const modal = document.getElementById("modalContent");
const logR = document.getElementById("logR");
const logClosed = document.getElementById("logRClosed");
const move = document.getElementById("interactive");
let movido = false;
logR.addEventListener("click", (e) => {
  
  e.preventDefault();
  
  if (modal.classList.contains("initial_disabled")) {
    modal.classList.remove("initial_disabled");
    modal.classList.add("action_look");
  }
});
logClosed.addEventListener("click", (e) => {
  console.log("object");
  e.preventDefault();
  console.log("object");
  if (modal.classList.contains("action_look")) {
    modal.classList.add("initial_disabled");
    modal.classList.remove("action_look");
  }
});

move.addEventListener("click", function () {
  console.log("object");
        if (!movido) {
            move.style.transform = "translate(-550px)";
        } else {
            move.style.transform = "translate(0px)";
        }
        movido = !movido;
    });



