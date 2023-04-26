
//Seleccionamos el formulario
const usuario = document.getElementById("usuario");

//Le agregamos un evento al boton
usuario.addEventListener("submit", (event) => {
    event.preventDefault();
    const valorNombre = document.querySelector('.nombre').value;
    const valorCorreo = document.querySelector('.correo').value;
    const valorPassword = document.querySelector('#pass1').value;
    let usuario = {nombre: valorNombre, correo: valorCorreo, password: valorPassword, rol:"USER_ROLE"}
    let usuarioJSON = JSON.stringify(usuario);

    
    fetch('https://lebrain.herokuapp.com/api/usuarios',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: usuarioJSON
    })//fetch
    .then(response => response.json())
    .then(data => {

      autenticarUsuario(); //====> ejecutamos esta funcion

  })//data
  .catch(error => {
    console.error('Hubo un problema con la solicitud fetch:', error);
    // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
    alert('Correo o contraseña incorrectos, intenta de nuevo.');
    location.reload();
  })//catch



  const autenticarUsuario = () => {

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
        // Aquí puedes hacer algo con el token y el objeto usuario, por ejemplo, guardarlos en local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));

        window.location.replace("inicio.html"); // especifica la ruta de la página a la que deseas redirigir
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
        // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
        alert('Correo o contraseña incorrectos, intenta de nuevo.');
    })

  }//autenticar usuario

}); //submit



function checkPasswords() {
    var password1 = document.getElementById("pass1");
    var password2 = document.getElementById("pass2");
    if (password1.value != password2.value) {
      password2.setCustomValidity("Las contraseñas no coinciden");
    } else {
      password2.setCustomValidity('');
    }
}
