function checkPasswords() {
    var password1 = document.getElementById("pass1");
    var password2 = document.getElementById("pass2");
    if (password1.value != password2.value) {
      password2.setCustomValidity("Las contraseñas no coinciden");
    } else {
      password2.setCustomValidity('');
    }
}