function handleContinue() {
  return window.location.href = "";
}

document.addEventListener('DOMContentLoaded', function() {
  const planButtons = document.querySelectorAll('.plan-button');
  planButtons.forEach(button => {
      button.addEventListener('click', function() {
          planButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
      });
  });
});
