const URL = "";
const username = document.querySelector("");
const email = document.querySelector("");
const password = document.querySelector("");

setInterval(nextSlide, 3000);

function nextSlide() {
  let activeSlide = document.querySelector(".carousel-item.active");
  activeSlide.classList.remove("active");
  let nextSlide = activeSlide.nextElementSibling;
  if (!nextSlide) {
    nextSlide = document.querySelector(".carousel-inner .carousel-item");
  }
  nextSlide.classList.add("active");
}

function registerUser() {
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  });
}
