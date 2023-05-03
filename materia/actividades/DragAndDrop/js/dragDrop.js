            
            /** Drag and drop **/
var dragSrcEl = null;
var cols = document.querySelectorAll('.ficha');
var palabrasOrdenadas = []

//guardamos el contenido que queremos cambiar para la transferencia al dejar de arrastrar
function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';  //efecto al mover
    return false;
}
function handleDragEnter(e) {
    this.classList.add('over');//agregamos borde rojo en el estilo css
}
function handleDragLeave(e) {
  this.classList.remove('over'); //eliminamos borde rojo en el estilo css
}
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); //evitamos abrir contenido en otra pagina al soltar
    }
    //hacemos el intercambio de contenido html de el elemento origne y destino
    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.classList.remove('over');
    }
    return false;
}
function handleDragEnd(e) {
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');//eliminamos el borde rojo de todas las columnas
    });
palabrasOrdenadas = [];
var items = document.querySelectorAll(".correct");
for (var i = 0; i < items.length; i++) {
    palabrasOrdenadas.push(items[i].textContent);
}


}
//agregamos todos los eventos anteriores a cada columna mediante un ciclo
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});
console.log(palabrasOrdenadas)

let botonVerificar = document.getElementById("verificar");
botonVerificar.addEventListener("click", function() {
    for (var i = 0; i < cols.length; i++){
        cols[0].setAttribute("draggable", "false");
    }

    var puntos = 0;
    var puntaje = 0;

    for(var i = 0; i < palabras.length; i++){

        if(palabrasOrdenadas[i] == palabras[i]){
            //console.log(`${palabrasOrdenadas[i]} es igual a ${palabras[i]}`)
            puntos += 100/palabras.length;
            puntaje = Math.floor(puntos);
            cols[i].style.backgroundColor = "green";
        }else{
            cols[i].style.backgroundColor = "red";
        }
    }


    let resultado = document.getElementById('resultado');
    resultado.innerHTML = "<p>Este es tu resultado: "+puntaje+"/100 </p>";
    let nextButton = document.getElementById('next-button');
    if(puntaje >= 60){
        nextButton.textContent = 'Siguiente';
        nextButton.disabled = false;
    } else {
        nextButton.textContent = 'Reintentar';
        nextButton.disabled = false;
        nextButton.addEventListener('click', function(event){
            event.preventDefault();
            window.location.reload();                 
        })
    }

});

