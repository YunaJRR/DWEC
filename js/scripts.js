addEventListener("DOMContentLoaded", (event) => {
    class Viaje {
        constructor(codigo, destino, precio, disponibilidad = true) {
            this.codigo = codigo;
            this.destino = destino;
            this.precio = precio;
            this.disponibilidad = disponibilidad;
        }
        getInfo() {
            return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros`;
        }
    }

    class Vuelo extends Viaje{
        constructor(codigo, destino, precio, aerolinea, duracion) {
            super(codigo, destino, precio);
            this.aerolinea = aerolinea;
            this.duracion = duracion;
        }
        getInfo() {
            return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`;
        }
    }

    class Hotel extends Viaje{
        constructor(codigo, destino, precio, estrellas, tipoHabitacion) {
            super(codigo, destino, precio);
            this.estrellas = estrellas;
            this.tipoHabitacion = tipoHabitacion;
        }
        getInfo() {
            return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`;
        }
    }

    class Paquete extends Viaje{
        constructor(codigo, destino, precio, vuelo, hotel) {
            super(codigo, destino, precio);
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
        constructor(cliente, viaje) {
            this.cliente = cliente;
            this.viaje = viaje;
        }
        getResumen() {
            return `${this.cliente.getResumen()}\nReservó: ${this.viaje.getInfo()}`;
        }
    }
    // Crear instancias
    const cliente1 = new Cliente("Ana", "Pérez", "ana.perez@gmail.com", "123456789");
    const vuelo1 = new Vuelo("V001", "París", 200, "Air France", 2.5);
    const hotel1 = new Hotel("H001", "París", 100, 4, "Doble");
    const paquete1 = new Paquete("P001", "París", 280, vuelo1, hotel1);
    
    // Crear una reserva
    const reserva1 = new Reserva(cliente1, paquete1);
    
    console.log(cliente1.getResumen());
    console.log(vuelo1.getInfo());
    console.log(paquete1.getInfo());
    console.log(reserva1.getResumen());

    const btnAñadirCliente = document.getElementById("btn-añadir-cliente");
    btnAñadirCliente.addEventListener("click", (event) => {
        añadirCliente();
    });

    const btnAñadirViaje = document.getElementById("btn-añadir-viaje");
    btnAñadirViaje.addEventListener("click", (event) => {
        añadirViaje();
    });

    function añadirCliente() {
        const clienteNombre = document.getElementById("cliente-nombre").value;
        const clienteApellidos = document.getElementById("cliente-apellidos").value;
        const clienteEmail = document.getElementById("cliente-email").value;
        const clienteTelefono = document.getElementById("cliente-telefono").value;
        const tablaClientes = document.getElementById("tabla-clientes");
        
        const nuevoCliente = new Cliente(`${clienteNombre}`, `${clienteApellidos}`, `${clienteEmail}`, `${clienteTelefono}`);

        const nuevaFilaCliente = document.createElement("tr");
        nuevaFilaCliente.innerHTML = `<td class='td-cliente-nombre'>${nuevoCliente.nombre}</td>
        <td>${nuevoCliente.apellido}</td>
        <td>${nuevoCliente.email}</td>
        <td>${nuevoCliente.telefono}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="eliminarCliente(nuevoCliente)">Eliminar</button>
        </td>`;

        tablaClientes.appendChild(nuevaFilaCliente);

        document.getElementById("cliente-nombre").value = '';
        document.getElementById("cliente-apellidos").value = '';
        document.getElementById("cliente-email").value = '';
        document.getElementById("cliente-telefono").value = '';

        reservaSelector();
    }


    function añadirViaje() {
        const viajesCodigo = document.getElementById("viajes-codigo").value;
        const viajesDestino = document.getElementById("viajes-destino").value;
        const viajesPrecio = document.getElementById("viajes-precio").value;
        const selViajesTipo = document.getElementById("sel-viajes-tipo");
        const optViajesTipo = selViajesTipo.options[selViajesTipo.selectedIndex].text;
        const tablaViajes = document.getElementById("tabla-viajes");
        
        const nuevoViaje = new Viaje(`${viajesCodigo}`, `${viajesDestino}`, `${viajesPrecio}`, `${optViajesTipo}`);

        const nuevaFilaViaje = document.createElement("tr");
        nuevaFilaViaje.innerHTML = `<td>${nuevoViaje.codigo}</td>
        <td>${nuevoViaje.destino}</td>
        <td>${nuevoViaje.precio}</td>
        <td>${optViajesTipo}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="eliminarCliente(nuevoCliente)">Eliminar</button>
        </td>`;

        tablaViajes.appendChild(nuevaFilaViaje);

        document.getElementById("viajes-codigo").value = '';
        document.getElementById("viajes-destino").value = '';
        document.getElementById("viajes-precio").value = '';
        document.getElementById("sel-viajes-tipo").value = '';
    }

    function añadirReserva(){

    }

    function reservaSelector() {
        const selector = document.getElementById('sel-clientes');
        selector.innerHTML = ''; 
        const opcionPredeterminada = new Option('Seleccionar Cliente');
        selector.add(opcionPredeterminada);
        const tablaClientes = document.getElementById("tabla-clientes");
        const filas = tablaClientes.getElementsByTagName("tr");
    
        for (let i = 0; i < filas.length; i++) {
            const nombresClientes = filas[i].getElementsByTagName("td");
            if (nombresClientes.length > 0) {
                const nombre = nombresClientes[0].innerText;
                const apellido = nombresClientes[1].innerText;
                const opcion = new Option(`${nombre} ${apellido}`, `${nombre} ${apellido}`);
                selector.add(opcion);
            }
        }
    }
});
