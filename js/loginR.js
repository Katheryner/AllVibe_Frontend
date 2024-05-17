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



document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;
  registerUser(username, email, password);
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;
  loginUser(email, password);
});


// Función para registrar un nuevo usuario
function registerUser(username, email, password) {
  fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    }),
  })
  .then(response => {
    if (response.ok) {
      console.log('Registro exitoso');
    } else {
      console.error('Error en el registro');
    }
  })
  .catch(error => {
    console.error('Error de red:', error);
  });
}

// Función para iniciar sesión
function loginUser(email, password) {
  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
  .then(response => {
    if (response.ok) {
      console.log('Inicio de sesión exitoso');
    } else {
      console.error('Error en el inicio de sesión');
    }
  })
  .catch(error => {
    console.error('Error de red:', error);
  });
}