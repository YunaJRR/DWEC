addEventListener('DOMContentLoaded', (event) => {
    class Viaje {
        constructor(codigo, destino, precio, tipo) {
            this.codigo = codigo;
            this.destino = destino;
            this.precio = precio;
            this.tipo = tipo;
        }
        getInfo() {
            return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros`;
        }
    }

    class Vuelo extends Viaje{
        constructor(codigo, destino, precio, aerolinea, duracion) {
            super(codigo, destino, precio, 'Vuelo');
            this.aerolinea = aerolinea;
            this.duracion = duracion;
        }
        getInfo() {
            return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`;
        }
    }

    class Hotel extends Viaje{
        constructor(codigo, destino, precio, estrellas, tipoHabitacion) {
            super(codigo, destino, precio, 'Hotel');
            this.estrellas = estrellas;
            this.tipoHabitacion = tipoHabitacion;
        }
        getInfo() {
            return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`;
        }
    }

    class Paquete extends Viaje{
        constructor(codigo, destino, precio, vuelo, hotel) {
            super(codigo, destino, precio, 'Paquete');
            this.vuelo = vuelo;
            this.hotel = hotel;
        }
        getInfo() {
            return `${super.getInfo()}\n - Vuelo: ${this.vuelo.getInfo()}\n - Hotel: ${this.hotel.getInfo()}`;
        }
    }

    class Cliente{
        constructor(nombre, apellido, email, telefono) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.email = email;
            this.telefono = telefono;
        }
        getResumen() {
            return `Cliente: ${this.nombre} ${this.apellido}, Email: ${this.email}, Teléfono: ${this.telefono}`;
        }
    }

    class Reserva{
        constructor(cliente, viaje, fecha) {
            this.cliente = cliente;
            this.viaje = viaje;
            this.fecha = fecha;
        }
        getResumen() {
            return `${this.cliente.getResumen()}\nReservó: ${this.viaje.getInfo()}`;
        }
    }
    // Ejemplo instancias
    const cliente1 = new Cliente("Ana", "Pérez", "ana.perez@gmail.com", "123456789");
    const vuelo1 = new Vuelo("V001", "París", 200, "Air France", 2.5);
    const hotel1 = new Hotel("H001", "París", 100, 4, "Doble");
    const paquete1 = new Paquete("P001", "París", 280, vuelo1, hotel1);
    
    const reserva1 = new Reserva(cliente1, paquete1);
    
    console.log(cliente1.getResumen());
    console.log(vuelo1.getInfo());
    console.log(paquete1.getInfo());
    console.log(reserva1.getResumen());

    // Al cargar la página las tablas y los selectores se rellenan con los datos en el localStorage
    cargarLocalStorage();
    actualizarSelectorCliente();
    actualizarSelectorViaje();

    const btnAñadirCliente = document.getElementById('btn-añadir-cliente');
    btnAñadirCliente.addEventListener('click', (event) => {
        añadirCliente();
    });

    const btnAñadirViaje = document.getElementById('btn-añadir-viaje');
    btnAñadirViaje.addEventListener('click', (event) => {
        añadirViaje();
    });

    const btnAñadirReserva = document.getElementById('btn-añadir-reserva');
    btnAñadirReserva.addEventListener('click', (event) => {
        añadirReserva();
    });

    // Las funciones de eliminación, al no ser llamadas de forma directa se declaran como variables
    eliminarCliente = function(nombre, apellido) {
        let clientes = JSON.parse(localStorage.getItem('clientes'));
        if (clientes === null){
            clientes = [];
        }
        clientes = clientes.filter(cliente => cliente.nombre !== nombre || cliente.apellido !== apellido);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        cargarLocalStorage(); 
        actualizarSelectorCliente(); 
    };

    eliminarViaje = function(codigo) {
        let viajes = JSON.parse(localStorage.getItem('viajes'));
        if (viajes === null){
            viajes = [];
        }
        viajes = viajes.filter(viaje => viaje.codigo !== codigo);
        localStorage.setItem('viajes', JSON.stringify(viajes));
        cargarLocalStorage(); 
        actualizarSelectorViaje(); 
    };

    eliminarReserva = function(cliente, viaje) {
        let reservas = JSON.parse(localStorage.getItem('reservas'));
        if (reservas === null){
            reservas = [];
        }
        reservas = reservas.filter(reserva => reserva.cliente !== cliente || reserva.viaje !== viaje);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        cargarLocalStorage(); 
    };

    function cargarLocalStorage() {
        // Aquí cargamos el LocalStorage como un JSON y con un forEach recorremos cada instancia y la introducimos en su tabla
        let clientes = JSON.parse(localStorage.getItem('clientes'));
        if (clientes === null){
            clientes = [];
        }
        const tablaClientes = document.getElementById('tabla-clientes');
        tablaClientes.innerHTML = '';
        clientes.forEach(cliente => {
            const nuevaFilaCliente = document.createElement('tr');
            nuevaFilaCliente.innerHTML = `<td class='td-cliente-nombre'>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>
                <button class='btn btn-danger btn-sm' onclick="eliminarCliente('${cliente.nombre}', '${cliente.apellido}')">Eliminar</button>
            </td>`;
            tablaClientes.appendChild(nuevaFilaCliente);
        });

        let viajes = JSON.parse(localStorage.getItem('viajes'));
        if (viajes === null){
            viajes = [];
        }
        const tablaViajes = document.getElementById('tabla-viajes');
        tablaViajes.innerHTML = '';
        viajes.forEach(viaje => {
            const nuevaFilaViaje = document.createElement('tr');
            nuevaFilaViaje.innerHTML = `<td>${viaje.codigo}</td>
            <td>${viaje.destino}</td>
            <td>${viaje.precio}</td>
            <td>${viaje.tipo}</td>
            <td>
                <button class='btn btn-danger btn-sm' onclick="eliminarViaje('${viaje.codigo}')">Eliminar</button>
            </td>`;
            tablaViajes.appendChild(nuevaFilaViaje);
        });

        let reservas = JSON.parse(localStorage.getItem('reservas'));
        if (reservas === null){
            reservas = [];
        }
        const tablaReservas = document.getElementById('tabla-reservas');
        tablaReservas.innerHTML = '';
        reservas.forEach(reserva => {
            const nuevaFilaReserva = document.createElement('tr');
            nuevaFilaReserva.innerHTML = `<td>${reserva.cliente}</td>
            <td>${reserva.viaje}</td>
            <td>${reserva.fecha}</td>
            <td>
                <button class='btn btn-danger btn-sm' onclick="eliminarReserva('${reserva.cliente}', '${reserva.viaje}', '${reserva.fecha}')">Eliminar</button>
            </td>`;
            tablaReservas.appendChild(nuevaFilaReserva);
        });
    }

    function añadirCliente() {
        const clienteNombre = document.getElementById('cliente-nombre').value;
        const clienteApellidos = document.getElementById('cliente-apellidos').value;
        const clienteEmail = document.getElementById('cliente-email').value;
        const clienteTelefono = document.getElementById('cliente-telefono').value;
        let mensajeErrorCliente = 'Los siguientes campos no pueden estar vacíos: ';
        let camposInsuficientesCliente = false;
        if (clienteNombre == ''){
            mensajeErrorCliente += 'Nombre. ';
            camposInsuficientesCliente = true;
        }
        if (clienteApellidos == ''){
            mensajeErrorCliente += 'Apellidos. ';
            camposInsuficientesCliente = true;
        }
        if (clienteEmail == ''){
            mensajeErrorCliente += 'Email. ';
            camposInsuficientesCliente = true;
        }
        if (clienteTelefono == ''){
            mensajeErrorCliente += 'Teléfono. ';
            camposInsuficientesCliente = true;
        }
        if (camposInsuficientesCliente){
            alert(mensajeErrorCliente);
            return; 
        }
        console.log(clienteApellidos);
         clienteApellidos;
        const nuevoCliente = new Cliente(clienteNombre, clienteApellidos, clienteEmail, clienteTelefono);
        const tablaClientes = document.getElementById('tabla-clientes');
        
        const nuevaFilaCliente = document.createElement('tr');
        nuevaFilaCliente.innerHTML = `<td class='td-cliente-nombre'>${nuevoCliente.nombre}</td>
        <td>${nuevoCliente.apellido}</td>
        <td>${nuevoCliente.email}</td>
        <td>${nuevoCliente.telefono}</td>
        <td>
            <button class='btn btn-danger btn-sm' onclick="eliminarCliente('${nuevoCliente.nombre}', '${nuevoCliente.apellido}')">Eliminar</button>
        </td>`;
        tablaClientes.appendChild(nuevaFilaCliente);

        añadirClienteLocalStorage(nuevoCliente);

        // Restablecemos los inputs
        document.getElementById('cliente-nombre').value = '';
        document.getElementById('cliente-apellidos').value = '';
        document.getElementById('cliente-email').value = '';
        document.getElementById('cliente-telefono').value = '';

        actualizarSelectorCliente();
    }

    function añadirViaje() {
        const viajesCodigo = document.getElementById('viajes-codigo').value;
        const viajesDestino = document.getElementById('viajes-destino').value;
        const viajesPrecio = document.getElementById('viajes-precio').value;
        const selViajesTipo = document.getElementById('sel-viajes-tipo');
        const optViajesTipo = selViajesTipo.options[selViajesTipo.selectedIndex].text;

        let mensajeErrorViaje = 'Los siguientes campos no pueden estar vacíos: ';
        let camposInsuficientesViaje = false;
        if (viajesCodigo == ''){
            mensajeErrorViaje += 'Código. ';
            camposInsuficientesViaje = true;
        }
        if (viajesDestino == ''){
            mensajeErrorViaje += 'Destino. ';
            camposInsuficientesViaje = true;
        }
        if (viajesPrecio == ''){
            mensajeErrorViaje += 'Precio. ';
            camposInsuficientesViaje = true;
        }
        if (optViajesTipo == 'Tipos de viajes'){
            mensajeErrorViaje += 'Tipo. ';
            camposInsuficientesViaje = true;
        }
        if (camposInsuficientesViaje){
            alert(mensajeErrorViaje);
            return; 
        }

        const nuevoViaje = new Viaje(viajesCodigo, viajesDestino, viajesPrecio, optViajesTipo);
        const tablaViajes = document.getElementById('tabla-viajes');
        
        const nuevaFilaViaje = document.createElement('tr');
        nuevaFilaViaje.innerHTML = `<td>${nuevoViaje.codigo}</td>
        <td>${nuevoViaje.destino}</td>
        <td>${nuevoViaje.precio}</td>
        <td>${optViajesTipo}</td>
        <td>
            <button class='btn btn-danger btn-sm' onclick="eliminarViaje('${nuevoViaje.codigo}')">Eliminar</button>
        </td>`;
        tablaViajes.appendChild(nuevaFilaViaje);

        añadirViajeLocalStorage(nuevoViaje);

        // Restablecemos los inputs
        document.getElementById('viajes-codigo').value = '';
        document.getElementById('viajes-destino').value = '';
        document.getElementById('viajes-precio').value = '';
        document.getElementById('sel-viajes-tipo').value = '';

        actualizarSelectorViaje();
    }

    function añadirReserva() {
        const selReservaCliente = document.getElementById('sel-reserva-cliente');
        const optReservaCliente = selReservaCliente.options[selReservaCliente.selectedIndex].text;
        const selReservaViaje = document.getElementById('sel-reserva-viaje');
        const optReservaViaje = selReservaViaje.options[selReservaViaje.selectedIndex].text;
        const fechaActual = new Date().toJSON().slice(0, 10); 
        let mensajeErrorReserva = 'Falta por seleccionar: ';
        let camposInsuficientesReserva = false;
        if (optReservaCliente == 'Seleccionar Cliente') {
            mensajeErrorReserva += 'Cliente. ';
            camposInsuficientesReserva = true;
        }
        if (optReservaViaje == 'Seleccionar Viaje') {
            mensajeErrorReserva += 'Reserva. ';
            camposInsuficientesReserva = true;
        }
        if (camposInsuficientesReserva) {
            alert(mensajeErrorReserva);
            return; 
        }
        const nuevaReserva = new Reserva(optReservaCliente, optReservaViaje, fechaActual); 
        const tablaReservas = document.getElementById('tabla-reservas');
        const nuevaFilaReserva = document.createElement('tr');
        nuevaFilaReserva.innerHTML = `<td>${nuevaReserva.cliente}</td>
        <td>${nuevaReserva.viaje}</td>
        <td>${nuevaReserva.fecha}</td> <!-- Use nuevaReserva.fecha -->
        <td>
            <button class='btn btn-danger btn-sm' onclick="eliminarReserva('${nuevaReserva.cliente}', '${nuevaReserva.viaje}')">Eliminar</button>
        </td>`;
        tablaReservas.appendChild(nuevaFilaReserva);
        añadirReservaLocalStorage(nuevaReserva);
        // Restablecemos los selectores
        document.getElementById('sel-reserva-cliente').value = 'Seleccionar Cliente';
        document.getElementById('sel-reserva-viaje').value = 'Seleccionar Viaje';
    }

    // Cada vez que añadimos un cliente, viaje o reserva llamamos a su función respectiva y lo almacenamos en el local storage en forma de JSON
    //Si hay elementos en el localStorage añadimos uno nuevo, si no hay ninguno creamos un nuevo array
    function añadirClienteLocalStorage(cliente) {
        let clientes = JSON.parse(localStorage.getItem('clientes'));
        if (clientes === null){
            clientes = [];
        }
        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    function añadirViajeLocalStorage(viaje) {
        let viajes = JSON.parse(localStorage.getItem('viajes'));
        if (viajes === null){
            viajes = [];
        }
        viajes.push(viaje);
        localStorage.setItem('viajes', JSON.stringify(viajes));
    }

    function añadirReservaLocalStorage(reserva) {
        let reservas = JSON.parse(localStorage.getItem('reservas'));
        if (reservas === null){
            reservas = [];
        }
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
    }
    
    // Los selectores para crear reservas se actualizan dinámicamente cada vez que se crea un nuevo cliente o viaje
    function actualizarSelectorCliente() {
        const selReservaCliente = document.getElementById('sel-reserva-cliente');
        selReservaCliente.innerHTML = ''; 
        const opcionPredeterminadaCliente = new Option('Seleccionar Cliente');
        selReservaCliente.add(opcionPredeterminadaCliente);
        const tablaClientes = document.getElementById('tabla-clientes');
        const filasCliente = tablaClientes.getElementsByTagName('tr');

        
    
        for (let i = 0; i < filasCliente.length; i++) {
            const nombresClientes = filasCliente[i].getElementsByTagName('td');
            if (nombresClientes.length > 0) {
                
                const nombre = nombresClientes[0].innerText;
                const apellido = nombresClientes[1].innerText;
                const opcionCliente = new Option(`${nombre} ${apellido}`);
                opcionCliente.setAttribute(`data-id`, `opcionCliente${i}`);
                selReservaCliente.add(opcionCliente);
            }
        }
    }
    function actualizarSelectorViaje() {
        const selReservaViaje = document.getElementById('sel-reserva-viaje');
        selReservaViaje.innerHTML = ''; 
    
        const opcionPredeterminadaViaje = new Option('Seleccionar Viaje');
        selReservaViaje.add(opcionPredeterminadaViaje); 
    
        const tablaViajes = document.getElementById('tabla-viajes');
        const filasViaje = tablaViajes.getElementsByTagName('tr');
    
        for (let i = 0; i < filasViaje.length; i++) {
            const columnasViaje = filasViaje[i].getElementsByTagName('td');
            if (columnasViaje.length > 0) {
                const destino = columnasViaje[1].innerText; 
                const opcionViaje = new Option(`${destino}`); 
                opcionViaje.setAttribute(`data-id`, `opcionViaje${i}`); 
                selReservaViaje.add(opcionViaje); 
            }
        }
    }
});