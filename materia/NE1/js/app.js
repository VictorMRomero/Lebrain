

document.addEventListener('DOMContentLoaded', function() {
    // Aquí va todo el código JavaScript
    // Obtener las tarjetas y la barra de progreso
  var cards = document.querySelectorAll('.card');
  var progressBar = document.querySelector('.progress-bar');
  var currentValue = 0;
  // Definir el valor máximo de la barra de progreso y el valor actual
  var maxValue = 100;

  
  // Mostrar la animación de carga
function showLoader() {
  document.getElementById("loader").style.display = "block";
}

// Ocultar la animación de carga
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}
// Mostrar la animación de carga cuando la página se carga
window.addEventListener("load", function() {
  showLoader();
});

// Ocultar la animación de carga después de que la página se carga
window.addEventListener("load", function() {
  setTimeout(function() {
    hideLoader();
    document.getElementById("card-container").style.display = "block";
  }, 1000);  

});

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
    if(index === cards.length - 2){
      cards[index].classList.add('active');   

      nextButton.textContent = 'Bloqueado';
      nextButton.disabled = true;
      hola = 3;


    }
    if (index === cards.length - 1){
      cards[index].classList.add('active');   
      updateProgressBar(maxValue); 
      nextButton.textContent = 'Vamos';
      nextButton.id = 'finalizar';

      var finalizar = document.querySelector('#finalizar');
      finalizar.addEventListener('click', function(){
        window.location.href = "questions.html";
      });


      
    } else {
      // Mostrar la tarjeta actual
      cards[index].classList.add('active');   
      // Actualizar el valor de la barra de progreso
      updateProgressBar(currentValue);
      currentValue += maxValue / (cards.length - 1);

    }
  }

  // Mostrar la primera tarjeta y actualizar la barra de progreso
  showCard(0);

  // Agregar un event listener al botón de "Siguiente"
  var nextButton = document.getElementById('next-button');
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


  Crear();


});





