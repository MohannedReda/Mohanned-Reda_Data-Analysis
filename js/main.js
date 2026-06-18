const body = document.body;
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const translatableElements = document.querySelectorAll("[data-en][data-ar]");

let currentLanguage = localStorage.getItem("language") || "en";
let currentTheme = localStorage.getItem("theme") || "light";

function updateThemeIcon() {
  if (!themeToggle) return;

  themeToggle.innerHTML =
    currentTheme === "dark"
      ? '<i class="fa-regular fa-sun"></i>'
      : '<i class="fa-regular fa-moon"></i>';
}

function applyTheme(theme) {
  currentTheme = theme;

  body.classList.remove("light-mode", "dark-mode");
  body.classList.add(`${theme}-mode`);

  localStorage.setItem("theme", theme);
  updateThemeIcon();
}

function applyLanguage(lang) {
  currentLanguage = lang;

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[currentLanguage];
  });

  if (currentLanguage === "ar") {
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
    if (langToggle) langToggle.textContent = "ع";
  } else {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
    if (langToggle) langToggle.textContent = "En";
  }

  localStorage.setItem("language", lang);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    applyLanguage(newLanguage);
  });
}

applyTheme(currentTheme);
applyLanguage(currentLanguage);