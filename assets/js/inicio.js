const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');


let bienvenida = document.getElementById("bienvenida");
bienvenida.innerHTML = `<h1 class="fw-bold"> Bienvenida/o "${user.nombre}" vamos a aprender juntos</h1>`;


if(user.materias.length){
  materias = user.materias;
  
  let nombreMateria = '';
  let linkMateria = '';
  //aqui debe de ir un for
  let total = materias.length;
  for(let i = 0; i < total; i++){
    
    let uidMateria = user.materias[i].materia._id;
    console.log(uidMateria)
    
    fetch(`https://lebrain.herokuapp.com/api/materias/${uidMateria}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la petición GET');
        }
      })
      .then(data => {
            console.log(data)

            miFuncion(data);
        })
      .catch(error => console.error(error));
    
    
      function miFuncion(data) {

    
        let materia = document.getElementById("materia");
        materia.innerHTML += `
        <div class="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-school">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
        <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
        </svg></div>
        <div>
          <h4 class="fw-bold">${data.nombre}</h4>
          <p class="text-muted">${data.descripcion.slice(0,100)}...</p>
          <button class="inicioTemario btn px-1" type="button" > Ir al temario </button>
        </div>
        `;

        let irTemario = document.querySelector('.inicioTemario');
        irTemario.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.setItem('idMateria', data._id)
          window.location.href = `materia/${data.link}`;
        })
    
      } 
  
    }
    
  } else {
    let materia = document.getElementById("materia");
    materia.innerHTML = `
    <p>Al parecer no tienes ninguna materia, puedes elegir alguna en el apartado de materias.</p>
    `;
  }



