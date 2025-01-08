$(document).ready(function() {
    const validacionEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const validacionContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    localStorage.clear;
    $('#irInicioSesion').click(function() {
        mostrarLoginRegistro(1);
    });

    $('#irRegistro').click(function() {
        mostrarLoginRegistro(2);
    });

    function mostrarLoginRegistro(opcion) {
        const inicioSesion = $("#inicioSesion");
        const registro = $("#registro");
        if (opcion == 1) {
            inicioSesion.attr('style', 'display: block;');
            registro.attr('style', 'display: none;');
        } else if (opcion == 2) {
            inicioSesion.attr('style', 'display: none;');
            registro.attr('style', 'display: block;');
        }
    }

    $('#formularioRegistro').on('submit', function(e) {
        e.preventDefault(); 

        const nombreUsuario = $('#registroNombre').val().trim();
        const email = $('#registroEmail').val().trim();
        const contraseña = $('#registroContraseña').val().trim(); 
        const contraseñaRepetida = $('#contraseñaRepetida').val().trim();

        if (!validacionContraseña.test(contraseña)) {
            alert("La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
            return; 
        }
        if (!validacionEmail.test(email)) {
            alert("email invalido");
            return;
        }
        if (!(contraseña === contraseñaRepetida)){
            alert("Las contraseñas no coinciden");
            return;
        }
        const usuario = {
            NombreUsuario: nombreUsuario,
            Email: email,
            Contraseña: contraseña
        };
        localStorage.setItem("Usuario", JSON.stringify(usuario));


        window.location.href = "admin.html";
        this.reset(); 
    });
});