// AOS Animation
if (window.innerWidth >= "768") {
  AOS.init({
    once: true,
    duration: 800,
    offset: 200,
    easing: "ease-in-out",
  });
} else {
  AOS.init({
    once: true,
    duration: 800,
    offset: 50,
    easing: "ease-in-out",
  });
}
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
    root.style.setProperty("--nav-shadow", "0 8px 10px #ffffff1a");
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
    document.querySelector(".fix").remove();
  } else {
    root.style.setProperty("--background-color", "#ffffff");
    root.style.setProperty("--background-color-secondary", "#F7F7F7");
    root.style.setProperty("--text-color", "#212529");
    root.style.setProperty("--border-color", "#dee2e6");
    root.style.setProperty("--main-shadow", "0 0 10px #0000001a");
    root.style.setProperty("--nav-shadow", "0 8px 10px #0000001a");
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

// Progress bar width control

let aboutSec = document.getElementById("about");
let progresBars = document.querySelectorAll(".progress-bar");
let loaderFinished;
function progresBarsWidth() {
  if (!loaderFinished) return false;
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

// Image Slider
document.addEventListener("DOMContentLoaded", function () {
  // References to modal and carousel elements
  const portfolioModal = document.getElementById("portfolioModal");
  const carouselPortfolio = document.querySelector(
    "#carouselPortfolio .carousel-inner"
  );
  const modal = new bootstrap.Modal(portfolioModal);
  let carousel;

  // Function to update carousel slides based on active tab content
  function updateCarouselSlides() {
    // Select only visible `.gallery-item` images in the active tab's content
    const activeTabPane = document.querySelector(".tab-pane.active");
    const visibleGalleryItems = activeTabPane.querySelectorAll(".gallery-item");

    // Clear all existing slides in the carousel
    carouselPortfolio.innerHTML = "";

    // Create a new slide for each visible image
    visibleGalleryItems.forEach((img, index) => {
      const slide = document.createElement("div");
      slide.classList.add("carousel-item");
      if (index === 0) slide.classList.add("active"); // Set the first slide as active

      // Clone the image element to add to the slide
      const slideImage = img.cloneNode(true);
      slide.appendChild(slideImage);

      // Append the slide to the carousel
      carouselPortfolio.appendChild(slide);
    });

    // Dispose of the previous carousel instance if it exists
    if (carousel) {
      carousel.dispose();
    }

    // Reinitialize the carousel after updating slides
    carousel = new bootstrap.Carousel(
      document.getElementById("carouselPortfolio"),
      {
        interval: false, // Disable autoplay for better control
      }
    );
  }

  // Event listener for opening the modal when `.open-slider` is clicked
  document.addEventListener("click", (e) => {
    if (e.target.closest(".open-slider")) {
      const clickedImage = e.target
        .closest(".port-item")
        .querySelector(".gallery-item");
      const index = Array.from(
        document.querySelectorAll(".tab-pane.active .gallery-item")
      ).indexOf(clickedImage);

      // Only show the modal if the image is part of the active tab's content
      if (index !== -1) {
        updateCarouselSlides();
        modal.show();
        carousel.to(index);
      }
    }
  });

  // Event listener for tab change
  document.querySelectorAll('button[data-bs-toggle="pill"]').forEach((tab) => {
    tab.addEventListener("shown.bs.tab", () => {
      updateCarouselSlides(); // Refresh carousel slides when a tab is shown
      AOS.refresh();
    });
  });

  // Initial setup of carousel slides on page load
  updateCarouselSlides();
});

// testimonials slider
var swiper = new Swiper(".slide-content", {
  slidesPerView: 1,
  loop: true,
  centerSlide: "true",
  fade: "true",
  speed: 500,
  grabCursor: "true",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// status counter
let nums = document.querySelectorAll(".num");
let workStatus = document.getElementById("status");
let started = false;
let duration = 1500;

function statuCount() {
  if (!loaderFinished) return false;
  if (window.scrollY >= workStatus.offsetTop - 300) {
    if (!started) {
      nums.forEach((num) => {
        startCount(num);
      });
    }
    started = true;
  }
}

function startCount(el) {
  let goal = parseInt(el.dataset.goal);
  let startTime = 0; // Track start time

  function updateCount(timestamp) {
    if (!startTime) startTime = timestamp; // Set the start time on first frame
    let progress = Math.min((timestamp - startTime) / duration, 1); // Progress between 0 and 1
    let currentValue = Math.floor(progress * goal); // Calculate the current value

    el.textContent = currentValue; // Update the element text

    if (currentValue < goal) {
      requestAnimationFrame(updateCount); // Continue animation
    }
  }

  requestAnimationFrame(updateCount); // Start the animation
}

window.addEventListener("scroll", statuCount);
window.addEventListener("load", statuCount);

// Loader Control

window.addEventListener("load", () => {
  const myLoaderBG = document.querySelector(".loader-container");
  const myLoader = document.querySelector(".loader");
  setTimeout(() => {
    myLoaderBG.classList.add("loader-hidden");
    myLoaderBG.addEventListener("transitionend", () => {
      myLoader.remove();
      loaderFinished = true;
      progresBarsWidth();
      statuCount();
    });
  }, 1200);
});

// nav-bar bg control

const navBar = document.getElementById("main-navBar");
function navControl() {
  if (window.scrollY >= aboutSec.offsetTop) {
    navBar.classList.add("nav-top");
  } else {
    navBar.classList.remove("nav-top");
  }
}

window.addEventListener("scroll", navControl);
window.addEventListener("DOMContentLoaded", navControl);

// scroll to top button
let span = document.querySelector(".top");

window.addEventListener("scroll", () => {
  if (this.scrollY >= 300) {
    span.classList.add("show");
  } else {
    span.classList.remove("show");
  }
});
span.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// close NavBar in mobile

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const mobileNav = document.querySelector(".navbar-collapse");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("show");
  });
});
