$(document).ready(function() {
    const validacionEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const validacionContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;


    $('#irInicioSesion').click(function() {
        mostrarLoginRegistro(1);
    });
    
    $('#irRegistro').click(function() {
        mostrarLoginRegistro(2);
    });
    $('#btnCerrarSesion').click(function() {
        cerrarSesion();
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
        console.log(`Email: "${email}"`);
        if (!validacionContraseña.test(contraseña)) {
            alert("La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
            return; 
        }
        if (!validacionEmail.test(email)) {
            alert("Email inválido");
            return;
        }
        if (!(contraseña === contraseñaRepetida)) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const usuario = {
            NombreUsuario: nombreUsuario,
            Email: email,
            Contraseña: contraseña
        };

        let usuarios = JSON.parse(localStorage.getItem("Usuarios")) || []; 
        if ((usuarios.findIndex(usuario => usuario.Email === email)) !== -1){
            alert("Email ya asociado a una cuenta.");
            return;
        }
        usuarios.push(usuario); 
        localStorage.setItem("Usuarios", JSON.stringify(usuarios)); 

        mostrarLoginRegistro(1);
        this.reset(); 
    });
    $('#formularioInicioSesion').on('submit', function(e) {
        e.preventDefault(); 
        const email = $('#inicioSesionEmail').val();
        const contraseña = $('#inicioSesionContraseña').val().trim();
    
        if (email === "" || contraseña === "") {
            alert("Por favor, complete todos los campos."); 
            return;
        }
    
        let usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];
        
        const indexUsuario = usuarios.findIndex(usuario => usuario.Email === email);
    
        if (indexUsuario === -1) {
            alert("Datos Incorrectos");
            return;
        }
    
        const usuario = usuarios[indexUsuario];
        if (usuario.Contraseña !== contraseña) {
            alert("Datos Incorrectos");
            return;
        }
        
        window.location.href = "admin.html";
        
        this.reset(); 
        
    });
    function cerrarSesion(){
        window.location.replace('index.html');
    }
    function cargarUsuarios() {
        let usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];
        const tbody = $('#usertable tbody');

        tbody.empty();
        
        usuarios.forEach(usuario => {
            const row = `<tr>
                            <td>${usuario.NombreUsuario}</td>
                            <td>${usuario.Email}</td>
                        </tr>`;
            tbody.append(row);
        });
        
        if ($.fn.DataTable.isDataTable('#usertable')) {
            $('#usertable').DataTable().destroy();
        }
    
        $('#usertable').DataTable({
            language: {
                processing: "Procesando...",
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                infoFiltered: "(filtrado de un total de _MAX_ registros)",
                loadingRecords: "Cargando...",
                zeroRecords: "No se encontraron resultados",
                emptyTable: "Ningún dato disponible en esta tabla",
                paginate: {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "Último"
                },
                aria: {
                    sortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sortDescending: ": Activar para ordenar la columna de manera descendente"
                }
            }
        });
    } 
    cargarUsuarios();
    
});