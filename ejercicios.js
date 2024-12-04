// Ejercicio 1
console.log("Ejercicio 1: Manipulación básica de arrays");

console.log("1. Crea un array con los números del 1 al 10.");
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numeros);

console.log("2. Usa el método map para crear un nuevo array que contenga los cuadrados de los números originales.");
const cuadrados = numeros.map(num => num ** 2);
console.log(cuadrados);

console.log("3. Filtra el array original para obtener solo los números pares.");
const pares = numeros.filter(num => num % 2 === 0);
console.log(pares);

console.log("4. Usa reduce para calcular la suma de todos los números del array.");
const suma = numeros.reduce((acum, num) => acum + num, 0);
console.log(suma);

// Ejercicio 2
console.log("Ejercicio 2: Transformaciones de strings");

console.log("1. Crea un array con los nombres de 5 ciudades.");
const ciudades = ["Madrid", "Jerez", "Barcelona", "Valencia", "Lugo"];
console.log(ciudades);

console.log("2. Convierte todos los nombres a mayúsculas usando map.");
const ciudadesMayusculas = ciudades.map(ciudad => ciudad.toUpperCase());
console.log(ciudadesMayusculas);

console.log("Ordena el array alfabéticamente con sort.");
const ciudadesOrdenadas = ciudades.sort();
console.log(ciudadesOrdenadas);

console.log("4. Busca si alguna ciudad comienza con la letra M utilizando some.");
if (ciudades.some(ciudad => ciudad.charAt(0) == "M")){
    console.log("Hay una ciudad que comienza con la letra M");
}else{
    console.log("No hay ninguna ciudad que comience con la letra M");    
}

console.log("5. Comprueba si todas las ciudades tienen más de 4 caracteres usando every.");
if (ciudades.every(ciudad => ciudad.length > 4)){
    console.log("Todas las ciudades tienen más de 4 caracteres");
}else{
    console.log("No todas las ciudades tienen más de 4 caracteres");
}

// Ejercicio 3
console.log("Ejercicio 3: Organización de datos");

console.log("1. Define un array de objetos que representen estudiantes, con las propiedades nombre, edad y nota:");
const arrEstudiantes = [
    { nombre: "Ana", edad: 20, nota: 8 },
    { nombre: "Luis", edad: 22, nota: 5 },
    { nombre: "María", edad: 19, nota: 7 },
    { nombre: "Carlos", edad: 21, nota: 4 }
];
console.log(JSON.stringify(arrEstudiantes)); 

console.log("2. Usa filter para obtener los estudiantes aprobados (nota mayor o igual a 5).");
const estudiantesAprobados = arrEstudiantes.filter(estudiante => estudiante.nota >= 5);
console.log(JSON.stringify(estudiantesAprobados)); 

console.log("3. Ordena a los estudiantes por edad con sort.");
const estudiantesOrdenadosEdad = arrEstudiantes.sort((a, b) => a.edad - b.edad);
console.log(JSON.stringify(estudiantesOrdenadosEdad)); 

console.log("4. Usa map para crear un array que solo contenga los nombres de los estudiantes.");
const nombresEstudiantes = arrEstudiantes.map(estudiante => estudiante.nombre);
console.log(JSON.stringify(nombresEstudiantes)); 

console.log("5. Calcula la nota promedio de los estudiantes con reduce.");
const promedioNotaEstudiantes = arrEstudiantes.reduce((media, estudiante) => media + estudiante.nota, 0)/arrEstudiantes.length;
console.log(promedioNotaEstudiantes);

// Ejercicio 4

console.log("Ejercicio 4: Análisis de palabras");

console.log("1. Crea un array con una lista de palabras (puedes inventarlas).");
const palabras = ["Servilleta", "Vidrio", "Estallar", "Corto", "Mal"];

console.log("2. Usa filter para encontrar las palabras que tienen más de 5 letras.");
const palabrasMasCincoLetras = palabras.filter(palabra => palabra.length > 5);
console.log(palabrasMasCincoLetras);

console.log("3. Invierte las letras de cada palabra utilizando map y split/reverse/join.");
const palabrasInvertidas = palabras.map(palabra => palabra.split("").reverse().join(""));
console.log(palabrasInvertidas);

console.log("4. Ordena las palabras por longitud usando una función personalizada en sort.");
const palabrasOrdenadasPorLongitud = palabras.sort((a, b) => a.length - b.length);
console.log(palabrasOrdenadasPorLongitud);

// Ejercicio 5
console.log("Ejercicio 5: Operaciones con matrices");
console.log("1. Crea dos arrays de números enteros de igual longitud.");
const numerosEnteros1 = [5, 8, 3, 20, 14];
const numerosEnteros2 = [7, 12, 2, 18, 4];
console.log(numerosEnteros1);
console.log(numerosEnteros2);

console.log("2. Usa map para crear un nuevo array que contenga la suma de los elementos correspondientes de ambos arrays.");
const sumaNumeros = numerosEnteros1.map((numeroEntero, index) => numeroEntero + numerosEnteros2[index]);
console.log(sumaNumeros);

console.log("3. Multiplica los elementos de un array por su índice usando map.");
const multiplicacionIndices = numerosEnteros1.map((numeroEntero, index) => numeroEntero * index);
console.log(multiplicacionIndices);

console.log("4. Encuentra el índice del primer número mayor a 10 en uno de los arrays usando findIndex.");
const indice = numerosEnteros2.findIndex(num => num > 10);
console.log(indice);

// Ejercicio 6
console.log("Ejercicio 6: Juego de palabras");

console.log("1. Crea un array con una frase dividida en palabras.");
const arrFrase = ["La", "vida", "es", "bella", "y", "divertida"];
console.log(arrFrase);

console.log("2. Usa reduce para reconstruir la frase en un solo string.");
const fraseString = arrFrase.reduce((frase, palabra) => frase + palabra + " ", "");
console.log(fraseString);

console.log("3. Invierte el orden de las palabras usando reverse.");
const frasePalabrasInvertidas = arrFrase.reverse();
console.log(frasePalabrasInvertidas);

console.log("4. Busca si la palabra bella está en la frase utilizando includes.");
if (arrFrase.includes("bella")){
    console.log("La palabra bella está en la frase");
}else{
    console.log("La palabra bella no está en la frase");
}

// Ejercicio 7
console.log("Ejercicio 7: Estadísticas rápidas");

console.log("1. Crea un array de números aleatorios entre 1 y 100 (usa Math.random y un bucle para generarlos).");
const numerosAleatorios = [];

for (let i = 0; i < 5; i++) {
    const numero = Math.floor(Math.random() * 100) + 1; 
    numerosAleatorios.push(numero);
}
console.log(numerosAleatorios);

console.log("2. Encuentra el número más alto con Math.max y spread operator.");
const maximo = Math.max(...numerosAleatorios);
console.log(maximo);

console.log("3. Encuentra el número más bajo de forma similar.");
const minimo = Math.min(...numerosAleatorios);
console.log(minimo);

console.log("4. Calcula la cantidad de números impares usando filter.");
const impares = numerosAleatorios.filter(num => num % 2 !== 0);
console.log(impares);


















