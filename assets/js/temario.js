const user = JSON.parse(localStorage.getItem('user'));
const idMateria = localStorage.getItem('idMateria');

let dataMaterias = '';


// Se rellena con los subtemas guardados en la base de datos
fetch('https://lebrain.herokuapp.com/api/subtemas')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error en la respuesta de la petición GET');
    }
  })
  .then(data => {
    dataSubtemas = data;
    //console.log(data.total)
    //console.log(data.materias[0])
    // nombreMateria = data.materia.nombre;
    //linkMateria = data.link;
    mostrarSubtemas(dataSubtemas);

    })
  .catch(error => console.error(error));

function mostrarSubtemas(dataSubtemas){

  localStorage.setItem('subtemas', JSON.stringify(dataSubtemas));
  let total = dataSubtemas.total;


  
  for(let i = 0; i < total; i++){

    
  if(dataSubtemas.subtemas[i].materia._id === idMateria){

    let subtemaData = dataSubtemas.subtemas[i];


    if(subtemaData.nombre[0] === "1"){
        
    
        let ponerSubtema = document.getElementById("primerSubtema");
        
        ponerSubtema.innerHTML += `<div class="subtema"><p>${subtemaData.nombre}</p><button class="bloqueado" id="${subtemaData._id}"></button></div>`

    } if(subtemaData.nombre[0] === "2"){
        let ponerSubtema = document.getElementById("segundoSubtema");
        
        ponerSubtema.innerHTML += `<div class="subtema"><p>${subtemaData.nombre}</p><button class="bloqueado" id="${subtemaData._id}"></button></div>`
    }


  }

    
  }


//Se ponen los que ya aprobo el estudiante

  let totalMateriasUsuario = user.materias.length;

  for(let i = 0; i < totalMateriasUsuario; i++){
    if(user.materias[i].materia === idMateria){

      let totalSubtemas = user.materias[i].subtemas.length;

      for(let j = 0; j < totalSubtemas; j++){
        let Subtema = user.materias[i].subtemas[j]
        let idSubtema = Subtema.subtema;   
        
        // Se tiene el id del usuario, con eso se jala los datos de los subtemas

        fetch(`https://lebrain.herokuapp.com/api/subtemas/${idSubtema}`)
        .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la petición GET');
        }
        })
        .then(data => {

        mostrarSubtemas(data);

        })
        .catch(error => console.error(error));

        const mostrarSubtemas = (data) => {
          
          //const botones = document.querySelectorAll('button[id]');
          let boton = document.getElementById(`${data._id}`);
          let divContenedor = boton.parentNode.parentNode.parentNode;
          let botonCollapse = divContenedor.parentNode.querySelector('button');

          
          if(Subtema.calificacion === 0){
            boton.classList.add("haciendo");
            boton.classList.remove('bloqueado');
            //Abrimos el acordeon de la actividad que vayamos realizando
            botonCollapse.classList.remove('collapsed');
            divContenedor.classList.add("show");
            botonCollapse.setAttribute('aria-expanded', 'true');

            boton.addEventListener('click', (e) => {
              e.preventDefault()
              localStorage.setItem('idSubtema', idSubtema);
              localStorage.setItem('linkSubtema', data.link);
              localStorage.setItem('numSubtema', j);
              window.location.href = data.link;
              
            })
          } if(Subtema.calificacion > 60){
            boton.classList.add('hecho');
            boton.classList.remove('bloqueado');
            boton.addEventListener('click', (e) => {
              e.preventDefault();
              alert('Ya realizaste el objeto, vamos por el siguiente');
            })
          } 
          let botonBloqueado = document.querySelectorAll('.bloqueado');
          for (let i = 0; i < botonBloqueado.length; i++) {
            botonBloqueado[i].addEventListener('click', function() {
              // Aquí puede agregar la funcionalidad que desea para cada botón
              alert('Aun no tienes disponible este elemento, pasa el anterior para desbloquear');
            });
          }



        }

      }


    }

  }
}
  






  
  
  

