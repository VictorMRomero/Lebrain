const user = JSON.parse(localStorage.getItem('user'));
let dataMaterias = '';

//Se listan las materias disponibles en la base de datos
fetch('https://lebrain.herokuapp.com/api/materias')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error en la respuesta de la petición GET');
    }
  })
  .then(data => {
    dataMaterias = data;
    //console.log(data.total)
    //console.log(data.materias[0])
    // nombreMateria = data.materia.nombre;
    //linkMateria = data.link;
    mostrarMaterias(dataMaterias);

    })
  .catch(error => console.error(error));

function mostrarMaterias(dataMaterias){

  
  let total = dataMaterias.total;
  let materiaData = dataMaterias.materias[0];
  
  
  for(let i = 0; i < total; i++){
    materiaData = dataMaterias.materias[i];
    console.log(materiaData._id)
    let materia = document.getElementById("materias");
    materia.innerHTML += `
      <div class="card-body">
      <div class="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-school">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
              <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
      </svg></div>
      <div>
      
      </div>
        <h4 class="fw-bold">${materiaData.nombre}</h4>
          <p class="text-muted">${materiaData.descripcion}</p>
          <a><button class="btn btn-sm px-0" id="${materiaData._id}" type="button">Añadir<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrow-right" >
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
          </svg></button></a>
      </div>
    `;

    
  }
  //aqui va un for

  const botones = document.querySelectorAll('button[id]');

  // Agregar manejador de eventos a cada botón
  botones.forEach((boton) => {
    boton.addEventListener('click', (event) => {
      const idBoton = event.target.id;
      const boton = event.target;

  // Cambiar el texto del botón

      localStorage.setItem('idMateria', idBoton);

      console.log(`Se hizo clic en el botón con id "${idBoton}"`);

      let totaUsuario = user.materias.length;

      for(let i = 0; i < totaUsuario; i++){
        if(user.materias[0].materia === idBoton){
          boton.textContent = 'Añadida';
          boton.disabled = true;
          return
        }
      }

      
      fetch(`https://lebrain.herokuapp.com/api/subtemas`)//fetch
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la petición GET');
        }
      })
      .then(data => {
        primerSub(data);
        addMateria(primerSubtema, idBoton);

  
      })
      .catch(error => {
      console.error('Ya tiene la materia registrada:', error);
        alert('Paso un error intenta mas tarde')
      })
      
      //=========primer subtema
      let primerSubtema;
      const primerSub = (data) =>{
        const total = data.subtemas.length;
        for(let i = 0; i < total; i++){
          if(idBoton === data.subtemas[0].materia._id){
            
            primerSubtema = data.subtemas[i]._id
            return
          }       
             
        }

      }
      

      //=========Añadir la materia

      const addMateria = (primerSubtema) => {

        const subtemas = [{subtema: primerSubtema, estado: true, calificacion:0}];
        const materias = [{materia: idBoton, subtemas: subtemas}];
        const usuario = {materias: materias};
        const usuarioJSON = JSON.stringify(usuario);
        console.log(usuarioJSON)
  
        fetch(`https://lebrain.herokuapp.com/api/usuarios/${user.uid}`,{
          method: 'PUT',
          headers: {
              'Content-Type':'application/json'
          },
          body: usuarioJSON
        })//fetch
        .then(x => actualizarUsuario())
        .catch(error => {
        console.error('Ya tiene la materia registrada:', error);
          alert('Paso un error intenta mas tarde')
        })

      }
      // aquí puedes hacer algo con el id del botón que se ha hecho clic
      






      const actualizarUsuario = () => {

      fetch(`https://lebrain.herokuapp.com/api/usuarios/${user.uid}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la petición GET');
        }
        })
        .then(data => {
          
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('idMateria', idBoton);
          console.log('actualizado')
          alert('Materia Agregada correctamente');

          boton.textContent = 'Añadida';
          boton.disabled = true;
      
          })
        .catch(error => console.error(error));

        }

      
        
    });
    //actualizarUsuario
    
  });
}



