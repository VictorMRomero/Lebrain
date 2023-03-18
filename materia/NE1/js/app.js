

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
  }, 2000);  

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


  Crear();


});





// Comienza un juego de palabras
!function(e,t,n){"use strict";var r=function(){var r,o,a,l=function(e,n){for(var r="",o=0,a=n.length;a>o;o++){var l=n[o];r+="<div>";for(var u=0,s=l.length;s>u;u++)r+='<button class="letra" x="'+u+'" y="'+o+'">',r+=l[u]||"&nbsp;",r+="</button>";r+="</div>"}t(e).html(r)},u=function(e,n){for(var r="<ul>",o=0,a=n.length;a>o;o++){var l=n[o];r+='<li class="word '+l+'">'+l}r+="</ul>",t(e).html(r)},s=[],i="",d=function(){t(this).addClass("selected"),o=this,s.push(this),i=t(this).text()},c=function(e){if(o){var n=s[s.length-1];if(n!=e){for(var r,l=0,u=s.length;u>l;l++)if(s[l]==e){r=l+1;break}for(;r<s.length;)t(s[s.length-1]).removeClass("selected"),s.splice(r,1),i=i.substr(0,i.length-1);var d=p(t(o).attr("x")-0,t(o).attr("y")-0,t(e).attr("x")-0,t(e).attr("y")-0);d&&(s=[o],i=t(o).text(),n!==o&&(t(n).removeClass("selected"),n=o),a=d);var c=p(t(n).attr("x")-0,t(n).attr("y")-0,t(e).attr("x")-0,t(e).attr("y")-0);c&&(a&&a!==c||(a=c,h(e)))}}},f=function(t){var n=t.originalEvent.touches[0].pageX,r=t.originalEvent.touches[0].pageY,o=e.elementFromPoint(n,r);c(o)},v=function(){c(this)},h=function(e){for(var n=0,o=r.length;o>n;n++)if(0===r[n].indexOf(i+t(e).text())){t(e).addClass("selected"),s.push(e),i+=t(e).text();break}},z=function(){for(var e=0,n=r.length;n>e;e++)r[e]===i&&(t(".selected").addClass("found"),r.splice(e,1),t("."+i).addClass("palabraEncontrada")),0===r.length&&t(".letra").addClass("complete");t(".selected").removeClass("selected"),o=null,s=[],i="",a=null},p=function(e,t,r,o){for(var a in n.orientations){var l=n.orientations[a],u=l(e,t,1);if(u.x===r&&u.y===o)return a}return null};return{create:function(e,o,a,s){r=e.slice(0).sort();var i=n.newPuzzle(e,s);return l(o,i),u(a,r),window.navigator.msPointerEnabled?(t(".letra").on("MSPointerDown",d),t(".letra").on("MSPointerOver",c),t(".letra").on("MSPointerUp",z)):(t(".letra").mousedown(d),t(".letra").mouseenter(v),t(".letra").mouseup(z),t(".letra").on("touchstart",d),t(".letra").on("touchmove",f),t(".letra").on("touchend",z)),i},solve:function(e,r){for(var o=n.solve(e,r).found,a=0,l=o.length;l>a;a++){var u=o[a].word,s=o[a].orientation,i=o[a].x,d=o[a].y,c=n.orientations[s];if(!t("."+u).hasClass("palabraEncontrada")){for(var f=0,v=u.length;v>f;f++){var h=c(i,d,f);t('[x="'+h.x+'"][y="'+h.y+'"]').addClass("solved")}t("."+u).addClass("palabraEncontrada")}}}}};window.wordfindgame=r()}(document,jQuery,wordfind);



var palabras = [];
var juego;

function Crear() {
// Tomar las palabras de la lista e introducurlas en un array
var lista = document.querySelector('.lista');
var listaPalabras = lista.querySelectorAll('li');
console.log(listaPalabras);
datos = [];
for (i = 0; i < (listaPalabras.length) ; i++) {
  datos.push(listaPalabras[i].textContent);
}

$('#Juegos').show();
/*
se esta indicando que en el contenedor con el id juego se va a mostrar la sopa de letras
y el contenedor con el id palabras va a mostrar las palabras a buscar
*/
juego = wordfindgame.create(datos, '#juego', '#Palabras');
// Estructura de la sopa de letras
var puzzle = wordfind.newPuzzle(datos, {
  height: 18,
  width: 18,
  fillBlanks: false
});
}
$('#solve').click(function() {
  wordfindgame.solve(juego, palabras);
});

