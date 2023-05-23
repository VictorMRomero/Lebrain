const usuario = document.getElementById("usuario");


const actualizarDatosUsuario = (id) => {
    fetch(`https://lebrain.herokuapp.com/api/usuarios/${id}`)
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
        window.location.href = 'inicio.html'

        
    
        })
      .catch(error => console.error(error));
    }

usuario.addEventListener("submit", (event) => {
    event.preventDefault();
    const valorCorreo = document.querySelector('.correo').value;
    const valorPassword = document.querySelector('#pass1').value;
    let usuario = {correo: valorCorreo, password: valorPassword}
    let usuarioJSON = JSON.stringify(usuario);
    
    fetch('https://lebrain.herokuapp.com/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: usuarioJSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json(); // Aquí se obtiene el objeto JSON de la respuesta
    })
    .then(data => {
        actualizarDatosUsuario(data.usuario.uid); // Aquí se pueden ver los datos del objeto JSON

        // Aquí puedes hacer algo con el token y el objeto usuario, por ejemplo, guardarlos en local storage
        localStorage.setItem('token', data.token);

        
        //window.location.replace("inicio.html"); // especifica la ruta de la página a la que deseas redirigir
    })
    .catch(error => {

        console.error('Hubo un problema con la solicitud fetch:', error);
        // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
        alert('Correo o contraseña incorrectos, intenta de nuevo.');

        location.reload();
    })





   
    
})


