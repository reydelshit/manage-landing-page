let buttonImages = ['./images/icon-hamburger.svg', './images/icon-close.svg']
let currentImage = 0;


const hamButton = document.querySelector(".hamburger__button");

hamButton.addEventListener('click', () => {
    const hamMenu = document.querySelector('.navigation_link__container');
    hamMenu.classList.toggle("navigation_link__container__active");

    currentImage = (currentImage + 1) % buttonImages.length;
    hamButton.src = buttonImages[currentImage];

    console.log('gaga')
});



const carousel = document.querySelector(".third_profile");
const slides = carousel.querySelectorAll(".profile_indi");
let activeSlide = carousel.querySelector(".active");
let startX;
let endX;
const slideCount = slides.length;
let currentSlide = 0;

for (let i = 0; i < slideCount; i++) {
  if (slides[i].classList.contains("active")) {
    currentSlide = i;
    break;
  }
}

const tracker = document.createElement("div");
tracker.classList.add("tracker");
for (let i = 0; i < slideCount; i++) {
  const trackerDot = document.createElement("div");
  trackerDot.classList.add("tracker-dot");
  if (i === currentSlide) {
    trackerDot.classList.add("active");
  }
  tracker.appendChild(trackerDot);
}

carousel.appendChild(tracker);

carousel.addEventListener("touchstart", function(event) {
  startX = event.touches[0].clientX;
});

carousel.addEventListener("touchend", function(event) {
  endX = event.changedTouches[0].clientX;
  const deltaX = endX - startX;
  if (deltaX > 0) {
    // Swiped right
    const previousSlide = activeSlide.previousElementSibling;

    if (!previousSlide) {
      return;
    }
    if (previousSlide) {
      activeSlide.classList.remove("active");
      previousSlide.classList.add("active");
      activeSlide = previousSlide;
      currentSlide--;
      updateTracker();
    } 
  } else {
    // Swiped left
    const nextSlide = activeSlide.nextElementSibling;

    if (nextSlide && currentSlide !== slideCount - 1) {
      activeSlide.classList.remove("active");
      nextSlide.classList.add("active");
      activeSlide = nextSlide;
      currentSlide++;
      updateTracker();
    } else {
      return;
    }
  }
});

function updateTracker() {
  const trackerDots = tracker.querySelectorAll(".tracker-dot");
  for (let i = 0; i < slideCount; i++) {
    trackerDots[i].classList.remove("active");
  }

  if (currentSlide < 0 || currentSlide >= slideCount) {
    return;
  }
  
  trackerDots[currentSlide].classList.add("active");
}
