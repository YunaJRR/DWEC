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
