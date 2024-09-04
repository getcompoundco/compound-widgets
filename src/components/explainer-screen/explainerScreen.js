document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carousel-image");
  const indicators = document.querySelectorAll(".indicator");
  const leftButton = document.querySelector(".carousel-btn.left");
  const rightButton = document.querySelector(".carousel-btn.right");
  const texts = document.querySelectorAll(".text");

  let currentIndex = 0;

  function updateCarousel(index) {
    images.forEach((image, i) => {
      image.classList.toggle("active", i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });
    texts.forEach((text, i) => {
      text.classList.toggle("active", i === index);
    });
  }

  leftButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    updateCarousel(currentIndex);
  });

  rightButton.addEventListener("click", () => {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    updateCarousel(currentIndex);
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      currentIndex = parseInt(indicator.getAttribute("data-index"));
      updateCarousel(currentIndex);
    });
  });

  updateCarousel(currentIndex); // Initialize the carousel
});

function handleContinue() {
  return window.location.href = '../savings-screen/savingsGoal/savingsGoal.html';
}