const user = JSON.parse(localStorage.getItem('user'));
let todasMaterias = '';
const idMateria = localStorage.getItem('idMateria');  

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
    todasMaterias = data;
    //console.log(data.total)
    //console.log(data.materias[0])
    // nombreMateria = data.materia.nombre;
    //linkMateria = data.link;
    mostrarMaterias(todasMaterias);

    })
  .catch(error => console.error(error));

function mostrarMaterias(todasMaterias){
  
  let total = todasMaterias.total;
  let materia = document.getElementById("materias");
  let idMateriasUsuarios=[];

  for(i of user.materias){
    idMateriasUsuarios += i.materia._id;
  }


  
  for(let i = 0; i < total; i++){
    let dataMateriaActual = todasMaterias.materias[i];

    if(idMateriasUsuarios.includes(todasMaterias.materias[i]._id)){
      // El usuario ya tiene la materia
      materia.innerHTML += `
      <div class="card-body">
        <div class="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-school">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
            <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
          </svg>
        </div>
        <div></div>
        <h4 class="fw-bold">${dataMateriaActual.nombre}</h4>
        <p class="text-muted">${dataMateriaActual.descripcion.slice(0, 90)}...</p>
        <a><button class="yaTiene inicioTemario btn px-1" data-link-materia="${dataMateriaActual.link}" data-id-materia="${dataMateriaActual._id}" type="button">Temario</button></a>
      </div>
    `;
    } else {
      // El usuario no tiene la materia
      materia.innerHTML += `
      <div class="card-body">
        <div class="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-school">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
            <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
          </svg>
        </div>
        <div></div>
        <h4 class="fw-bold">${dataMateriaActual.nombre}</h4>
        <p class="text-muted">${dataMateriaActual.descripcion}</p>
        <a><button class="inicioTemario btn px-1" id="${dataMateriaActual._id}" type="button">Añadir</button></a>
      </div>
    `;
    }
  
  }
  

    
  

  //Seleccionamos los que ya tiene añadido el usuario
  let irTemario = document.querySelectorAll('.yaTiene')
  irTemario.forEach((boton) => {
    
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      
      const botonHTML = event.target; //asi sabemos a que boton le dio click
      const valorAtributo = botonHTML.getAttribute("data-link-materia");
      let idMateria = botonHTML.getAttribute('data-id-materia');
      localStorage.setItem('idMateria', idMateria)
      window.location.href = `materia/${valorAtributo}`;
    })
  })

  
  //Seleccionamos todos los botones con id
  const botones = document.querySelectorAll('button[id]');
  // Agregar manejador de eventos a cada botón de las que puede agregar
  botones.forEach((boton) => {
    boton.addEventListener('click', (event) => {
      const idBoton = boton.id;
      localStorage.setItem('idMateria', idBoton)
      

      
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
  
      })
      .catch(error => {alert('Paso un error intenta mas tarde')})
      
      //=========primer subtema
      let primerSubtema;
      const primerSub = (data) =>{
        const total = data.subtemas.length;
        for(let i = 0; i < total; i++){
          if(idBoton === data.subtemas[i].materia._id){
            
            primerSubtema = data.subtemas[i]._id;
            console.log(data.subtemas[i])
            addMateria(primerSubtema, idBoton);
            return
            
          }     
             
        }
        alert('no encontro ninguno')
        console.log(primerSubtema)
        return

      }
      

      //=========Añadir la materia

      const addMateria = (primerSubtema) => {
        console.log('si entro a addmateria')
        console.log(primerSubtema)
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

          boton.textContent = 'ir al temario';
          boton.addEventListener('click', (e)=>{
            e.preventDefault;
            window.location.href="../materia/NE1/negociosElectronicos1.html"
          });
      
          })
        .catch(error => console.error(error));

        }

      
        
        
    });
    //actualizarUsuario
    
  });
}



