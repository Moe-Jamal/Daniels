// Dark-Mode Swtich
const root = document.documentElement;
const computedStyle = getComputedStyle(root);
const darkModeToggle = document.querySelector(".dark-toggel");
const toggleIcon = document.querySelector(".dark-toggel i");
function toggleTheme() {
  const currentBackgroundColor =
    computedStyle.getPropertyValue("--background-color");
  const currentTheme = currentBackgroundColor === "#ffffff" ? "light" : "dark";
  if (currentTheme === "light") {
    root.style.setProperty("--background-color", "#000000");
    root.style.setProperty("--background-color-secondary", "#090A0C");
    root.style.setProperty("--text-color", "#dee2e6");
    root.style.setProperty("--border-color", "#6c757d80");
    root.style.setProperty("--main-shadow", "0 0 10px #ffffff1a");
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
    document.querySelector(".fix").remove();
  } else {
    root.style.setProperty("--background-color", "#ffffff");
    root.style.setProperty("--background-color-secondary", "#F7F7F7");
    root.style.setProperty("--text-color", "#212529");
    root.style.setProperty("--border-color", "#dee2e6");
    root.style.setProperty("--main-shadow", "0 0 10px #0000001a");
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
    const newElement = document.createElement("div");
    newElement.classList.add("fix");
    document.body.appendChild(newElement);
  }
}

darkModeToggle.addEventListener("click", toggleTheme);

// Color Picker Slide
const colorPickerBtn = document.querySelector(".color-btn");
colorPickerBtn.addEventListener("click", () => {
  const colorsHolder = document.querySelector(".colors");
  if (colorsHolder.style.left === "0px") {
    colorsHolder.style.left = "-180px";
  } else {
    colorsHolder.style.left = "0px";
  }
});

const colorOptions = document.querySelectorAll(".color-option");
function changeColor(newColor) {
  root.style.setProperty("--accent-color", newColor);
}
colorOptions.forEach((color) => {
  color.addEventListener("click", () => {
    const selectedColor = color.getAttribute("data-color");
    changeColor(selectedColor);
  });
});

// Loader Control

window.addEventListener("load", () => {
  const myLoaderBG = document.querySelector(".loader-container");
  const myLoader = document.querySelector(".loader");
  setTimeout(() => {
    myLoaderBG.classList.add("loader-hidden");
    myLoaderBG.addEventListener("transitionend", () => {
      myLoader.remove();
    });
  }, 1500);
});

// Progress bar width control
let aboutSec = document.getElementById("about");
let progresBars = document.querySelectorAll(".progress-bar");

// window.addEventListener("scroll", () => {
//   if (
//     window.scrollY >= aboutSec.offsetTop - 200 &&
//     window.innerWidth >= "992"
//   ) {
//     progresBars.forEach((prog) => {
//       prog.style.width = prog.dataset.width;
//     });
//   } else if (
//     (window.scrollY >= aboutSec.offsetTop + 200) &
//     (window.innerWidth < "992")
//   ) {
//     progresBars.forEach((prog) => {
//       prog.style.width = prog.dataset.width;
//     });
//   }
// });

function progresBarsWidth() {
  const isDesktop = window.innerWidth >= 992;
  const offset = isDesktop ? 200 : -200;
  if (window.scrollY >= aboutSec.offsetTop - offset) {
    progresBars.forEach((prog) => {
      prog.style.width = prog.dataset.width;
    });
  }
}

window.addEventListener("scroll", progresBarsWidth);
window.addEventListener("load", progresBarsWidth);
