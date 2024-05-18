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
const body = document.getElementById("body");
const logR = document.getElementById("logR");
const logClosed = document.getElementById("logC");
const logC = document.getElementById("logCd");

logR.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    modal.classList.contains("initial_disabled") ||
    modal.classList.contains("disebled_")
  ) {
    modal.classList.remove("initial_disabled");
    modal.classList.add("disebled_");
    modal.classList.add("action_look");
    body.classList.add("noScroll");
  }
});
logClosed.addEventListener("click", (e) => {
  
  e.preventDefault();
  if (modal.classList.contains("action_look")) {
    body.classList.remove("noScroll");
    modal.classList.add("initial_disabled");
    modal.classList.remove("action_look");
  }
});
logC.addEventListener("click", (e) => {
  
  e.preventDefault();
  if (modal.classList.contains("action_look")) {
    body.classList.remove("noScroll");
    modal.classList.add("initial_disabled");
    modal.classList.remove("action_look");
  }
});



const btn = document.getElementById('Sign');

btn.addEventListener('click', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;

  const formData = {
    username: username,
    email: email,
    password: password
  };

  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      
    });
    console.log(response);
   
    if (response.ok) {
      console.log('Registro exitoso');
     

    } else {
      console.error('Error en el registro uno');
    }
  } catch (error) {
    console.error('Error en el registro:', error);
  }
}



const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', handleLogin);

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;

  const formData = {
    email: email,
    password: password
  };

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Inicio de sesión exitoso');
      // Redireccionar a la página de inicio después del inicio de sesión exitoso
      //window.location.href = 'https://cloud.mongodb.com/v2/66307a9e5d04d15827e370f1#/overview';
      const token = await response.json()
      console.log(token);
      localStorage.setItem('token', JSON.stringify(token))
    } else {
      console.error('Error en el inicio de sesión');
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
  }
}







