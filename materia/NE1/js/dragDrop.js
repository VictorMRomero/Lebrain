var palabras = ["Búsqueda del producto", "Selección del producto", "Proceso de pago", "Confirmación de la compra", "Entrega del producto", "Servicio postventa"];
            
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
var items = document.querySelectorAll(".ficha");
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

let botonVerificar = document.getElementById("verificar");
botonVerificar.addEventListener("click", function() {
    cols[0].setAttribute("draggable", "false");
    cols[1].setAttribute("draggable", "false");
    cols[2].setAttribute("draggable", "false");
    cols[3].setAttribute("draggable", "false");
    var puntos = 0;
    var puntaje = 0;
    for(var i = 0; i < palabras.length; i++){
        if(palabrasOrdenadas[i] == palabras[i]){
            puntos += 100/palabras.length;
            puntaje = Math.floor(puntos);
        }
    }



    var resultado = document.getElementById('resultado');
    resultado.innerHTML = "<p>Este es tu resultado: "+puntaje+"/100 </p>";

});

