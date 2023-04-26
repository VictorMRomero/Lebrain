malas = JSON.parse(localStorage.getItem('malas'));
linkMateria = localStorage.getItem('linkSubtema');

let total = malas.length;
console.log(malas[0])

let tarjetas = document.getElementById('tarjetas');
console.log(tarjetas)
for(let i = 0; i < total ; i++){
    let pregunta = malas[i].question;
    let numRespuesta = (malas[i].answer) - 1;
    let respuesta = malas[i].option[numRespuesta];
    let retro = malas[i].retro;
    
    tarjetas.innerHTML += `
    <div class="blog-card">
    <div class="description">
        <h1>${pregunta}</h1>
        <h2>R= ${respuesta}</h2>
        <p>${retro}</p>
    </div>
    </div>
    `;
    
}


const botonReintentar = document.getElementById('next-button');

botonReintentar.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = `${linkMateria}`;
})



