// Obtener las tarjetas y la barra de progreso
var cards = document.querySelectorAll('.card');
var progressBar = document.querySelector('.progress-bar');
var questions = [  {    question: '¿En qué año comenzó la Segunda Guerra Mundial?',    answer: '1939'  },  {    question: '¿Quién escribió la novela "Cien años de soledad"?',    answer: 'Gabriel García Márquez'  },  {    question: '¿Cuál es la capital de Francia?',    answer: 'París'  }];
var score = 0;

// Definir el valor máximo de la barra de progreso y el valor actual
var maxValue = 100;
var currentValue = 0;

// Función para actualizar el valor de la barra de progreso
function updateProgressBar(value) {
  progressBar.style.width = value + '%';
  progressBar.setAttribute('aria-valuenow', value);
}




// Función para mostrar la tarjeta actual y actualizar la barra de progreso
function showCard(index, answer) {
  // Ocultar todas las tarjetas
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove('active');
  }
  // Mostrar la tarjeta actual
  cards[index].classList.add('active');
  // Verificar si la respuesta del usuario es correcta
  if (answer === questions[index].answer) {
    score++;
  }
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


nextButton.addEventListener('click', function() {
  // Obtener el índice de la tarjeta actual
  var currentIndex = Array.from(cards).findIndex(function(card) {
    return card.classList.contains('active');
  });
  // Obtener la respuesta del usuario
  var answer = document.querySelector('#answer').value;
  // Mostrar la siguiente tarjeta y actualizar la barra de progreso
  showCard(currentIndex, answer);
  // Limpiar el campo de respuesta
  document.querySelector('#answer').value = '';
  // Verificar si se han contestado todas las preguntas
  if (currentIndex === cards.length - 1) {
    // Mostrar la calificación final
    alert('Tu calificación es: ' + score + '/' + questions.length);
  }
});