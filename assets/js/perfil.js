const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const subtemas = JSON.parse(localStorage.getItem('subtemas'));
const idMateria = localStorage.getItem('idMateria');


let totalMaterias = user.materias.length;


let actualizarUsuario = document.getElementById("actualizarUsuario");
const pattern = "(?=.*\\d)(?=.*[a-zA-Z]).{8,}"

actualizarUsuario.innerHTML = `
<p>Actualiza tu nombre</p>
<div class="mb-3"><input class="form-control shadow"  placeholder="${user.nombre}" ></div>
<p>Actualiza tu contraseña</p>
<div class="mb-3"><input class="shadow-sm form-control" id="pass1" type="password" name="password" placeholder="Contraseña" pattern="(?=.*\\d)(?=.*[a-zA-Z]).{8,}" placeholder="Contraseña" title="La contraseña debe tener al menos 8 caracteres y contener al menos un número y una letra" oninput="checkPasswords()"></div></div>
<div class="mb-3"><input class="form-control shadow-sm" id="pass2" type="password" name="password" placeholder="Repite tu Contraseña" title="La contraseña debe tener al menos 8 caracteres y contener al menos un número y una letra" oninput="checkPasswords()"></div>

<div class="mb-5"><button class="btn btn-primary shadow" type="submit">Entrar</button></div>
`;

const actualizarDatosUsuario = () => {
  fetch(`https://lebrain.herokuapp.com/api/usuarios/${user.uid}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error en la respuesta de la petición GET');
    }
    })
    .then(data => {
      localStorage.removeItem('idMateria');
      localStorage.setItem('user', JSON.stringify(data));
  
      alert('Actualizacion correcta');
      
      location.reload();
      
  
      })
    .catch(error => console.error(error));
  }


actualizarUsuario.addEventListener("submit", (event) => {
    event.preventDefault();
    let valorNombre = document.querySelector('.form-control').value;
    if (valorNombre.length === 0){
        valorNombre = user.nombre;
    }
    
    const valorPassword = document.querySelector('#pass1').value;


    const usuario = {nombre: valorNombre, password: valorPassword};
    const usuarioJSON = JSON.stringify(usuario);
    
    console.log(usuarioJSON);

    fetch(`https://lebrain.herokuapp.com/api/usuarios/${user.uid}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: usuarioJSON
    })
    .then(x => actualizarDatosUsuario())

});



function checkPasswords() {
    var password1 = document.getElementById("pass1");
    var password2 = document.getElementById("pass2");

    if (password1.value != password2.value) {
      password2.setCustomValidity("Las contraseñas no coinciden");
    } else {
      password2.setCustomValidity('');
    }
}


for(let i = 0; i<totalMaterias; i++){
    
    fetch(`https://lebrain.herokuapp.com/api/materias/${user.materias[i].materia}`)
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
    mostrarMaterias(dataMaterias, i);

    })
  .catch(error => console.error(error));
    
    
    const mostrarMaterias = (dataMaterias, i) => {


        let tarjetas = document.getElementById('tarjetas');
        tarjetas.innerHTML += `
        <div class="blog-card">
            <div class="description">
                <h1>${dataMaterias.nombre.toUpperCase()}</h1>
                <h2>${dataMaterias.descripcion}</h2>
                <p>${(100/subtemas.total)*(user.materias[i].subtemas.length)}%</p>
                <div class ="conBoton"><button class="eliminar" id="${dataMaterias._id}">Eliminar</button></div>
            </div>
        </div>
        `;
        // Obtén una referencia al primer elemento <p> dentro de todos los elementos con la clase "blog-card"
        var parrafo = document.querySelector(".blog-card p:first-of-type");

        // Añade un estilo adicional al pseudoelemento :before
        parrafo.style.setProperty("width", `${(100/subtemas.total)*(user.materias[i].subtemas.length)}%`);
        
        const botones = document.querySelectorAll('button[id]');
        botones.forEach((boton) => {
          boton.addEventListener('click', (event) => {
            const idBoton = boton.id;

            const eliminarJSON = `{"eliminar": ${JSON.stringify(idBoton)}}`
            
    
            if (window.confirm('¿Está seguro de que desea eliminar la materia? Perdera todos sus avances.')) {
              // La acción se realizará si el usuario hace clic en "Aceptar"
              fetch(`https://lebrain.herokuapp.com/api/usuarios/${user.uid}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: eliminarJSON
              })//fetch
              .then(x => actualizarDatosUsuario())
              .catch(error => {
              console.error('Ya tiene la materia registrada:', error);
                alert('Paso un error intenta mas tarde')
              })
            } else {
              // La acción no se realizará si el usuario hace clic en "Cancelar"
    
            }
          })


        })
        
    }
    
}
