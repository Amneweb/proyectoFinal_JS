// function ejecutar() {
//     const funciones = [
//         ["Sábado 20/9 - 17:00",
//             "Sábado 20/9 - 18:30",
//             "Sábado 20/9 - 21:00",
//             "Domingo 21/9 - 14:00",
//             "Domingo 21/9 - 19:00"],
//         ["Sábado 20/9 - 16:00",
//             "Sábado 20/9 - 18:00",
//             "Sábado 20/9 - 19:50",
//             "Domingo 21/9 - 16:00",
//             "Domingo 21/9 - 19:00"],
//     ];
//     function mostrarFuncion(sala) {
//         let mostrar = "Acá te mostramos las funciones para dicha sala\n";
//         funciones[sala - 1].forEach((element, index) => mostrar = mostrar + "\n" + (index + 1) + " -> " + element);
//         return mostrar;
//     }
//     let precio = 0;
//     function precioEntrada(sala, fila) {
//         switch (sala) {
//             case 1:
//                 if (fila <= 8) {
//                     precio = 2900;
//                 } else {
//                     precio = 3500;
//                 }
//                 break;
//             case 2:
//                 if (fila <= 8) {
//                     precio = 2200;
//                 } else {
//                     precio = 2800;
//                 }
//                 break;
//         }
//         return precio;
//     }
//     function alertaVacio(variable) {
//         alert("No ingresaste ningún valor de " + variable + ". Por favor volvá al inicio y cargá los datos nuevamente.")
//     }
//     const peli = new Array();
//     peli[0] = "Titanic";
//     peli[1] = "Indiana Jones y el templo de la perdición";
//     peli[2] = "Toy Story";
//     peli[3] = "Volver al futuro";
//     peli[4] = "Africa mía";

//     let listarNombres = "Estas son las películas en cartelera\n";
//     for (let i = 0; i < 5; i++) {
//         listarNombres = listarNombres + (i + 1) + "->" + peli[i] + "\n";
//     }
//     const peli_index = parseInt(prompt(listarNombres + "Por favor ingrese el número de la película elegida"));
//     if (peli_index) {
//         if ((peli_index < 1) || (peli_index > 5)) {
//             alert("El número que ingresaste no corresponde a ninguna película. Por favor intentalo de nuevo");
//             return;
//         } else {
//             alert("Elegiste '" + peli[peli_index - 1] + "'. Hacé click en OK para continuar la compra.");

//         }
//     } else {
//         alertaVacio("película");
//         return;
//     }
//     let sala = "";
//     const lista_precios = "SALAS Y PRECIOS\n1-> ****  Sala Premium ****\nFilas 1 a 8: $2900\nFilas 9 a 20: $3500\n2-> **** Sala Clásica ****\nFilas 1 a 8: $2200\nFilas 9 a 20: $2800\n";
//     sala = parseInt(prompt(lista_precios + "Ingresá el número correspondiente a la sala elegida"));
//     if (sala) {
//         if ((sala < 1) || (sala > 2)) {
//             alert("El número no corresponde a ninguna sala, por favor intentalo nuevamente");
//             return;
//         } else {
//             mostrar = mostrarFuncion(sala);
//             funcionElegida = prompt(mostrar + "\n¿Qué función elegís?");
//         }
//     } else {
//         alertaVacio("número de sala");
//         return;
//     }
//     const nombreSala = (sala == 1) ? "Premium" : "Clásica";

//     let cantidad = 0;
//     let fila = 0;
//     cantidad = parseInt(prompt("¿Cuántas entradas querés comprar? El máximo disponible son 10 entradas."));
//     if (cantidad) {
//         if (cantidad > 10) {
//             alert("Lo sentimos la cantidad de entradas deseada (" + cantidad + ") excede la capacidad de la sala");
//             return;
//         }
//     } else {
//         alertaVacio("cantidad de entradas");
//         return;
//     }
//     fila = parseInt(prompt("Ingrese el número de fila. Hay un máximo de 20 filas."));
//     if (fila) {

//         if ((fila < 1) || (fila > 20)) {
//             alert("El número de fila que ingresaste no corresponde a ninguna fila existente. Por favor volvé a iniciar el proceso y seleccioná una fila entre 1 y 20.");
//             return;
//         }
//     } else {
//         alertaVacio("número de fila");
//         return;
//     }
//     let a_pagar = precioEntrada(sala, fila) * cantidad;
//     alert("Gracias por comprar tus entradas en Cine Vintage. Este es el resumen de tu compra:\n-> Película: " + peli[peli_index - 1] + "\n-> Sala: " + nombreSala + "\n-> Funcion: " + funciones[sala - 1][funcionElegida - 1] + "\n-> Cantidad de entradas: " + cantidad + "\n-> Fila: " + fila + "\n-> TOTAL A PAGAR: $" + a_pagar);
// }
/**************** hasta acá fue la primer entrega **************************** */

//************** AL FINAL NO LO HICE ASI */
//para las funciones voy a definir un array directamente, suponiendo qeu los horarios son siempre los mismos
//y que solo varian las asignaciones (sala1 tiene las funciones ... entre los días ... con la peli ...)

//const funciones = new Array();
//el metodo getDay de JS define que el domingo es 0, lunes 1, etc. Entonces
//En el array de funciones (que es una matriz de dimension 2) una de las dimensione ssera el día de la
//semana, que va a tener key = 0, 1, 2, etc y la otra serán los horarios de las funciones para ese día
//funciones[0] = ["13:00","15:00",""] ;
//************** AL FINAL NO LO HICE ASI */


//hacer las funciones para cada pelicula y segun el dia
//agregar fechas de proyeccion de cada peli
//asignar funciones a salas
//agregar peliculas futuras a la cartelera
//armar carrito de compras de snacks
//armar vector de sala, funcion, cantidad de asientos ocupados



//tengo que definir si el precio es una función o un objeto
//si es un objeto, las propiedades son sala, dia de la semana, hora
//si es una funcion, se calcula en base a la funcion (que ya tiene incorporados los datos de la sala, el día y la hora)
//y, tal vez, en base al asiento elegido


const formatearDia = (anio,mes,dia) => new Date(anio,mes,dia).toLocaleDateString(); //para formatear la salida de las fechas
//  console.log(formatearDia (2014,5,23));

//  console.log([0, 1, 1, 0, 0].reduce(
//     (accumulator, currentValue) => currentValue===0?accumulator + 1:accumulator,
//     0,
//   ));
let counter=new Array;
let totalAsientosLibres = 0;
const asientosParticular = [
[0,0,0,1,1],
[1,1,0,0,1],
[1,1,1,0,1],
[0,0,0,0,0],
[1,1,0,0,1],
[1,1,1,1,1]
];
const contadorCeros = (vector) =>
    vector.reduce(
        (accumulator, currentValue) => currentValue===0?accumulator + 1:accumulator,
        0,
      );
      for (let x = 0; x < asientosParticular.length; x++) {
counter[x]=contadorCeros(asientosParticular[x]);
totalAsientosLibres=totalAsientosLibres+counter[x];
}

//   let counter = new Array;
// let totalAsientosLibres = 0;
// for (let x = 0; x < asientosParticular.length; x++) {
//     counter[x] = asientosParticular[x].reduce(
//         (accumulator, currentValue) => currentValue===0?accumulator + 1:accumulator,
//         0,
//       );
//       totalAsientosLibres=totalAsientosLibres+counter[x];
//     }
    console.log(totalAsientosLibres);
    console.log(counter);

    // for (let x = 0; x < counter.length; x++) {
    //     if (counter[x] >= entradas) {
    //         filasConAsientosLibres.push(x + 1);
    //     }
    // }
    const entradas = 3;
    let filasConAsientosLibres=new Array;
    counter.forEach((element,index) => {if(element >= entradas){filasConAsientosLibres.push(index + 1);}});
    console.log(filasConAsientosLibres);

    
  // let iterador = 1;
    // let listaPelis = "";
    // for (const peli of pelis) {
    //     listaPelis = listaPelis + iterador.toString() + "=> " + peli.nombre + "\n";
    //     iterador++;
    // } esto se reemplaza con lo de abajo

    let example = ["example1", "example2", "example3"]
let impresion = example.map( (e, i) => (i + 1 + "=>" + e) ).join('\n');
console.log(impresion);

 // asientos = new Array(filasSala);
    // for (let fila = 0; fila < filasSala; fila++) {
    //     asientos[fila] = new Array(columnasSala);
    //     for (let columna = 0; columna < columnasSala; columna++) {
    //         asientos[fila][columna] = 0;
    //     }
    // }

const filasSala = 20;
    const columnasSala = 10;
    asientos = new Array(filasSala).fill().map(() => new Array(columnasSala).fill(0));
    console.log(asientos);
    //function mostrarOcupacion(asientosOcupacion) { //esta funcion se va a usar para después mostrar los asientos en pantalla
      //  let ocupacion = asientosOcupacion.map((element, i) => ("Fila "+(i + 1) + " => [ " + element[i].join(" ] [ ")).join('\n'));
        // let ocupacion = "";
        // for (let i = 0; i < asientosOcupacion.length; i++) {
        //     ocupacion = ocupacion + "Fila " + (i + 1).toString() + " => [ " + asientosOcupacion[i].join(" ] [ ") + " ]\n";
    
        // }
       // return ocupacion;
    //}
    //Cómo mostrar todos los elementos de un array de dos diensiones
    const matriz = [
        [0,0,0,1,1],
        [1,1,0,0,1],
        [1,1,1,0,1],
        [0,0,0,0,0],
        [1,1,0,0,1],
        [1,1,1,1,1]
        ];
    const ocupacion =(matriz)=> matriz.map((element, i) => ("Posición "+(i) + " => " + element.join(" "))).join('\n');

    //Primero hacemos un join para juntar todos los elementos de una fila. Por ejemplo, si tenemos un vector:
    const vector = [1,1,1,1,1,1];
    //para mostrar todos los elementos en consola, separados por un espacio, usamos join
    console.log(vector.join(" "));
    //esa construcción la guardamos como string
    const stringDeVector = vector.join(" ");
    console.log(stringDeVector);
    //Ahora, antes de volver a la matriz, vamos a escribir el vector en forma vertical, para que se entienda mejor.
    const vector1 = [ //tuve que crear otra variable porque me daba error porque ya estaba declarada
    1,
    1,
    1,
    1,
    1,
    1
    ];
 //Si cada elemento del vector, en lugar de ser un número es otro vector, pasamos a la matriz
 
 //primero convertimos esos vectores parciales en un solo elemento. Para eso mapeamos cada elemento de la matriz y en el nuevo vector guardamos el join correspondiente 
    //Si fuera un array de una sola dimensión: 
    //element representa a cada valor guardado en el array
    //i representa el índice de cada posición donde están guardados los elementos

    console.log("asientosAmostrar");
    console.table(ocupacion(asientosAmostrar));

    let pruebaConsoleDir = document.body;
    console.log(pruebaConsoleDir);
    console.dir(pruebaConsoleDir);

    /**
 *
 * @abstract funcion para contar la cantidad de asientos libres CONTIGUOS. Eso después se compara con la cantidad de entradas a comprar y se muestra qué filas tienen asientos contiguos libres (no sé si esta función va a usarse en el proyecto final, pero por las dudas no la borro). Acá no puedo usar la función de contarCeros porque esa función (usando .reduce) recorre todo el array antes de decirme el total y en este caso paro de contar cuando llego a asientos = entradas. 
 * @param {array} matrizAsientos Corresponde a la matriz de filas y columnas de asientos en una sala.
 * @param {number} entradas Cantidad de entradas a comprar.  
 * @returns un string que muestra todas las filas que tienen la cantidad necesarias de asientos contiguos (es decir, la cantidad de entradas)
 * 
 */
function asientosContiguos(entradas, matrizAsientos) {
  let filasConAsientosContiguos = [];
  let contador = 0;
  for (let i = 0; i < matrizAsientos.length; i++) {
      for (let j = 0; j < matrizAsientos[i].length; j++) {
          if (matrizAsientos[i][j] === 0) {
              contador++;
              if (contador >= entradas) {
                  filasConAsientosContiguos.push(i + 1);
                  contador = 0;
                  break;
              }
          } else {
              contador = 0;
          }
      }
      contador = 0;
  }
  return alertaFilas = "las filas con " + entradas + " o más asientos libres contiguos son: " + filasConAsientosContiguos.join();
}

