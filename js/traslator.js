const lang = document.querySelector(".change-language");
let langLS;
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  langDefect();
});
lang.addEventListener("click", async (e) => {
  e.preventDefault();
  if (langLS == "en") {
    localStorage.setItem("lang", "es");
    langLS = "es";
    console.log(langLS);
    selectLanguage();
  } else {
    localStorage.setItem("lang", "en");
    langLS = "en";
    selectLanguage();
  }
});

async function selectLanguage() {
  if (langLS == "en") {
    const language = await fetch(`/languaje/en.json`);
    const langE = await language.json();
    translator(langE);
  } else {
    const language = await fetch(`/languaje/es.json`);
    const langS = await language.json();
    translator(langS);
  }
}

async function translator(language) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-lang");
    element.innerHTML = language[key];
  });
}

function langDefect() {
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "en");
    langLS = "en";
  } else {
    langLS = localStorage.getItem("lang");
  }
  selectLanguage();
}