// Obtener las tarjetas y la barra de progreso
var cards = document.querySelectorAll('.card');
var progressBar = document.querySelector('.progress-bar');

// Definir el valor máximo de la barra de progreso y el valor actual
var maxValue = 100;
var currentValue = 0;

// Función para actualizar el valor de la barra de progreso
function updateProgressBar(value) {
  progressBar.style.width = value + '%';
  progressBar.setAttribute('aria-valuenow', value);
}

// Función para mostrar la tarjeta actual y actualizar la barra de progreso
function showCard(index) {
  // Ocultar todas las tarjetas
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove('active');
  }
  // Mostrar la tarjeta actual
  cards[index].classList.add('active');
  // Actualizar el valor de la barra de progreso
  currentValue += maxValue / cards.length;
  updateProgressBar(currentValue);
}

// Mostrar la primera tarjeta y actualizar la barra de progreso
showCard(0);

// Agregar un event listener al botón de "Siguiente"
var nextButton = document.querySelector('#next-button');
nextButton.addEventListener('click', function() {
  // Obtener el índice de la tarjeta actual
  var currentIndex = Array.from(cards).findIndex(function(card) {
    return card.classList.contains('active');
  });
  // Calcular el índice de la siguiente tarjeta
  var nextIndex = (currentIndex + 1) % cards.length;
  // Mostrar la siguiente tarjeta y actualizar la barra de progreso
  showCard(nextIndex);
});