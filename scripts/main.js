const currency = (valor) => valor.toLocaleString('es-ar', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
});

const formatearDia = (anio, mes, dia) => new Date(anio, mes, dia).toLocaleDateString();

const acortarPalabra = (palabra, caracteres) => palabra.length > caracteres ? palabra.substring(0, caracteres) + "..." : palabra;

const cerosEnMatriz = (matriz) => {
    const vector = matriz.flat();
    const contador = vector.reduce(
        (accumulator, currentValue) => currentValue === 0 ? accumulator + 1 : accumulator,
        0,
    );
    return contador;
}

function calcularPrecio(sala, dia, mes, anio) {
    let precio;
    switch (sala) {
        case 0:
            precio = PRECIOBASE * 1.2;
            break;
        case 1:
            precio = PRECIOBASE;
            break;
        case 2:
            precio = PRECIOBASE * 0.8;
    }
    switch (() => new Date(anio, mes, dia).getDay()) {
        case 6: //sábado
            precio = parseInt(precio * 1.1);
            break;
        case 3: //miercoles
            precio = parseInt(precio * 0.5);
            break;
        default:
            precio = parseInt(precio);
    }
    return precio;
}

function inicializarAsientos(sala) {
    const filasSala = salas[sala].filas;
    const columnasSala = salas[sala].columnas;
    asientos = new Array(filasSala).fill().map(() => new Array(columnasSala).fill(0));
    return asientos;
}

function simularOcupacion(funcion) {
    const filasFuncion = salas[funcion.sala].filas;
    const columnasFuncion = salas[funcion.sala].columnas;
    asientos = new Array(filasFuncion).fill().map(() => new Array(columnasFuncion).fill().map(() => Math.round(Math.random())));
    return asientos;
}

function dibujarPlatea(asientos) {
    const FRAGMENTO = new DocumentFragment();
    
    const pantalla = document.createElement("div");
    pantalla.classList.add("pantalla");
    pantalla.innerText = "Pantalla";
    FRAGMENTO.append(pantalla);
    const soloPlatea = document.createElement("div");
    soloPlatea.id="platea";
    asientos.forEach((arrayFila, indiceFila) => {
        const fila = document.createElement("div");
        fila.className = "fila";
        fila.id = `fila${indiceFila + 1}`;
        arrayFila.forEach((valor, indiceColumna) => {
            const lugar = document.createElement("input");
            lugar.type = "checkbox";
            lugar.className = "asiento";
            lugar.id = `f${indiceFila}-c${indiceColumna}`;
            if (valor === 1) {
                lugar.disabled = true;
                lugar.className = "asiento ocupado";
            } else {
                lugar.className = "asiento libre";
            }
            fila.appendChild(lugar);
        });
        soloPlatea.append(fila);
    });
    FRAGMENTO.append(soloPlatea);
    const cerrarPlatea = document.createElement("button");
        cerrarPlatea.id="cerrar-platea";
        cerrarPlatea.classList.add("cerrar-platea");
        cerrarPlatea.innerText="CONFIRMAR Y CERRAR 👍";
        cerrarPlatea.addEventListener("click",()=> document.querySelector("#contenedor-platea").classList.remove("full"));
        FRAGMENTO.append(cerrarPlatea);
    return FRAGMENTO;
}

function armarDatosPeli(PELIELEGIDA) {
    const FRAGMENTO = new DocumentFragment();
    const TITULOS = [
        "nombre",
        "duración",
        "director",
        "año",
        "actores",
        "género",
        "edad",
        "rating",
        "trama"
    ];
    const CONTENIDO = [
        PELIELEGIDA.nombre,
        PELIELEGIDA.duracion,
        PELIELEGIDA.director,
        PELIELEGIDA.anio,
        PELIELEGIDA.actor,
        PELIELEGIDA.genero,
        PELIELEGIDA.edad,
        PELIELEGIDA.rating,
        acortarPalabra(PELIELEGIDA.resumen, 120)
    ]
    TITULOS.forEach((titulo, llave) => {
        const itemTitulo = document.createElement('div');
        itemTitulo.classList.add("datospeli__item", "datospeli__item--left");
        itemTitulo.textContent = titulo.toUpperCase();
        FRAGMENTO.append(itemTitulo);
        const itemContenido = document.createElement('div');
        itemContenido.classList.add("datospeli__item", "datospeli__item--right");
        itemContenido.textContent = CONTENIDO[llave];
        FRAGMENTO.append(itemContenido);
    });
    return FRAGMENTO;
}

function dibujarSnacks(Snack) {
    const FRAGMENTO = new DocumentFragment();
    const snacks__item = document.createElement("div");
    snacks__item.classList.add("snacks__item");
    const snacks__img = document.createElement("img");
    snacks__img.setAttribute("src", `assets/imagenes/${Snack.id}.png`);
    snacks__img.setAttribute("alt", `Foto de ${Snack.nombre}`);
    const snacks__contenido = document.createElement("div");
    snacks__contenido.classList.add("snacks__item--contenido");
    const snacks__p = [];
    snacks__p[0] = document.createElement("p");
    snacks__p[0].classList.add("snacks__p", "snacks__p--nombre");
    snacks__p[0].innerText = `${Snack.nombre}`;
    snacks__p[1] = document.createElement("p");
    snacks__p[1].classList.add("snacks__p");
    snacks__p[1].innerText = `${Snack.descripcion}`;
    snacks__contenido.append(snacks__img);
    snacks__p.forEach((element) => snacks__contenido.append(element));
    snacks__item.append(snacks__contenido);
    FRAGMENTO.append(snacks__item);
    return FRAGMENTO;
}

function dibujarSnacksEnEntradas(Snack) {
    const FRAGMENTO = new DocumentFragment();
    const snacks__item = document.createElement("div");
    snacks__item.classList.add("snacks__item");
    const snacks__img = document.createElement("img");
    snacks__img.setAttribute("src", `assets/imagenes/${Snack.id}.png`);
    snacks__img.setAttribute("alt", `Foto de ${Snack.nombre}`);
    const snacks__contenido = document.createElement("div");
    snacks__contenido.classList.add("snacks__item--contenido");
    const snacks__p = document.createElement("p");
    snacks__p.classList.add("snacks__titulo");
    snacks__p.innerText = `${Snack.nombre}`;
    const snacks__precio = document.createElement("p");
    snacks__precio.classList.add("snacks__precio");
    snacks__precio.innerText = `${currency(Snack.precio)}`;
    const snacks__input = document.createElement("input");
    snacks__input.classList.add("snacks__input");
    snacks__input.setAttribute("id", Snack.id);
    snacks__input.setAttribute("value", "Elegir");
    snacks__input.setAttribute("type", "button");
    snacks__contenido.append(snacks__img);
    snacks__contenido.append(snacks__p);
    snacks__contenido.append(snacks__precio);
    snacks__contenido.append(snacks__input);
    snacks__item.append(snacks__contenido);
    FRAGMENTO.append(snacks__item);
    return FRAGMENTO;
}

function dibujarSelectorPeliculas(id = "") {
    const FRAGMENTO = new DocumentFragment();
    let pelisReordenadas;
    if (id == "") {
        pelisReordenadas = pelis;
        const optionInicial = document.createElement("option");
        optionInicial.value = "";
        optionInicial.classList.add("select--disabled");
        optionInicial.setAttribute("disabled", "disabled");
        optionInicial.setAttribute("selected", "selected");
        optionInicial.innerHTML = "Elegí la película";
        FRAGMENTO.appendChild(optionInicial);
    } else {
        pelisReordenadas = reordenarPelis(id);
    };
    pelisReordenadas.forEach((elemento) => {
        const optionPelicula = document.createElement("option");
        optionPelicula.value = elemento.id;
        optionPelicula.innerText = elemento.nombre;
        FRAGMENTO.appendChild(optionPelicula);
    }
    );
    return FRAGMENTO;
}

function dibujarDatosPeli(id) {
    const PELIELEGIDA = pelis.find((element) => element.id === id);
    DOMdatospeli = document.querySelector(".entradas__datospeli");
    DOMimagenPeli = document.querySelector(".entradas__imagen")
    DOMdatospeli.style["background-color"] = "var(--rojo-butaca)";
    DOMdatospeli.innerHTML = "";
    DOMdatospeli.appendChild(armarDatosPeli(PELIELEGIDA));
    DOMimagenPeli.innerHTML = `<img src="assets/imagenes/peliculas/${PELIELEGIDA.id}.jpg" alt="Poster película elegida">`;
}

function dibujarSelectorFunciones(id) {
    const DOMdivSelectorFunciones = document.querySelector("#entradas__funcion");
    const propiedadesFunciones = window.getComputedStyle(DOMdivSelectorFunciones);
    if (propiedadesFunciones.display === "none") {
        DOMdivSelectorFunciones.style["display"] = "block";
    }
    const PELIELEGIDA = pelis.find((element) => element.id === id);
    const mostrarNombreCorto = acortarPalabra(PELIELEGIDA.nombre, 12);
    const DOMselectorFunciones = document.querySelector("#select__funcion");
    DOMselectorFunciones.innerHTML = `<option class="select--disabled" selected disabled value="">Elegí la función para la película ${mostrarNombreCorto}</option>`;
    const funcionesPeliSeleccionada = funciones.filter((peliculaId) => peliculaId.pelicula == id);
    funcionesPeliSeleccionada.forEach((elemento) => {
        optionFuncion = document.createElement("option");
        optionFuncion.value = elemento.id;
        optionFuncion.innerText = "Día " + formatearDia(elemento.anio, elemento.mes, elemento.dia) + " Hora " + elemento.hora;
        DOMselectorFunciones.appendChild(optionFuncion);
    });
};

function mostrarTodo() {
    divEntradas = document.querySelector("#section__entradas");
    divEntradas.innerHTML =
        `<section class="section__titulo--entradas">
            <h2>comprá tus entradas</h2>
            <h3 class="section__entradas--cerrar"><i class="fa-solid fa-xmark cerrar"></i></h3>
        </section>
        
        <section class="entradas">
            <div class="entradas__izquierda">
                <form action="" id="selectores">
                    <div class="entradas__selectores">
                        <div class="entradas__select">
                        <select name='select__pelicula' id='select__pelicula'></select>
                        </div>
                        <div class="entradas__select" id="entradas__funcion">
                            <select name="select__funcion" id="select__funcion">
                            </select>
                        </div>
                        <div class="entradas__cantidad">
                            <input type="number" id="entradas" name="entradas__input" class="select" placeholder="¿Cuántas entradas querés?">
                            <input type="submit" value="Enviar" id="boton__entradas" name="entradas__button" class="select">
                        </div>
                     </div>
                </form>
                <div class="entradas__resumen">
                </div> 
                
            </div>
            <div class="entradas__derecha">
            
                <div class="entradas__imagen">
                </div>
                <div class="entradas__datospeli">       
                </div>     
                <div class="contenedor-platea" id="contenedor-platea">   
                </div>
                <div class="carrito">
                </div>
            </div>
        </section>`;
}

function mostrarAsientos(Elegidos) {
    let COORDENADAS_ASIENTOS = "";
    const MOSTRAR_ASIENTOS = document.querySelector(".asientos__elegidos");
    const ElegidosID = [];
    Elegidos.forEach((elegido, llave) => {
        COORDENADAS_ASIENTOS += "<p>Asiento " + (llave + 1) + " <i class='fa-solid fa-right-long'></i> " + coordenadas(elegido.id) + "</p>";
        ElegidosID.push(elegido.id);
    });
    COORDENADAS_ASIENTOS += "<p class='aclaracion' id='advertencia'><i class='fa-solid fa-triangle-exclamation'></i>Para modificar los asientos, hacer click en la platea sobre el/los asientos seleccionados y elegir otro/s.</p>";
    MOSTRAR_ASIENTOS.innerHTML = COORDENADAS_ASIENTOS;
    return ElegidosID;
}

function seleccionDeAsientos(event, entradasRequeridas) {
    idSeleccionado = event.target.id;
    DOMplatea = document.querySelector("#platea");
    if (event.target.classList.contains("indeterminado")) {
        
        event.target.checked = false;
        Swal.fire({
            html: '<h3>atención</h3><p>Ya tenés ' + entradasRequeridas + ' asientos seleccionados. Para cambiarlos debés liberar uno de los que ya elegiste</p>',
            icon: 'warning',
            iconColor: '#cc2d2c',
            confirmButtonColor: '#cc2d2c'
        })
    } else {
        if (!event.target.classList.contains("elegido")) {
           
            event.target.classList.replace("libre", "elegido");
            const Elegidos = DOMplatea.querySelectorAll('input[type="checkbox"]:checked');
            if (Elegidos.length === entradasRequeridas) {
                const Libres = DOMplatea.querySelectorAll(".libre");
                Libres.forEach((element) => {
                    element.classList.replace("libre", "indeterminado");
                    element.indeterminate = true;
                });
                cargarAsientos(mostrarAsientos(Elegidos));
                document.querySelector("#totalEntradas") && document.querySelector("#totalEntradas").remove();
                const totalEnEntradas = document.createElement("div");
                totalEnEntradas.classList.add("totales");
                totalEnEntradas.id = "totalEntradas";
                totalEnEntradas.innerHTML = `<p>Total entradas: ${currency(totalApagarEntradas)}</p>`;
                const ENTRADAS_RESUMEN = document.querySelector(".entradas__resumen");
                ENTRADAS_RESUMEN.appendChild(totalEnEntradas);
                ENTRADAS_RESUMEN.appendChild(dibujarBotones());
            }
        } else {
            
            const Indeterminados = DOMplatea.querySelectorAll(".indeterminado");
            const MOSTRAR_ASIENTOS = document.querySelector(".asientos__elegidos");
            const divBotones = document.querySelector("#botones");
            if (document.body.contains(divBotones)) {
                document.querySelector("#botones").remove();
            }
            MOSTRAR_ASIENTOS.innerHTML = "<p class='aclaracion'>Asiento/s liberados. Seleccionar uno o más asientos para llegar a la cantidad de entradas.</p>";
            event.target.classList.replace("elegido", "libre");
            Indeterminados.forEach((element) => {
                element.classList.replace("indeterminado", "libre");
                element.indeterminate = false;
            });
        }
    }
}

function armarCarritoEntradas(FUNCIONELEGIDA, entradasRequeridas) {
    sessionStorage.getItem("compra") && sessionStorage.removeItem("compra")
    Object.keys(carritoEntradas).length = 0;
    carrito.length = 0;
    carritoEntradas = {
        funcion: FUNCIONELEGIDA.id,
        cantidad: entradasRequeridas,
        lugares: []
    }
    carrito.push(carritoEntradas);
    cargarStorage();
}

function cargarAsientos(asientos) {
    carrito[0].lugares = asientos;
    sessionStorage.removeItem("compra");
    cargarStorage();
}

function cargarStorage() {
    sessionStorage.setItem('compra', JSON.stringify(carrito));
}

function recuperarStorage() {
    const carritoSS = JSON.parse(sessionStorage.getItem('compra'));
    return carritoSS;
}

function dibujarSnacksElegidos() {
    document.querySelector("#boton_pagar").remove();
    const carritoEnStorage = recuperarStorage();
    let totalGeneral;
    const listadoSnacks = document.querySelector(".entradas__izquierda");
    if (carritoEnStorage.length > 1) {
        if (!document.querySelector("#titulo-snacks")) {
            const tituloSnacks = document.createElement("h3");
            tituloSnacks.id = "titulo-snacks";
            tituloSnacks.innerHTML = "Snacks seleccionados";
            listadoSnacks.append(tituloSnacks);
        }
        document.querySelectorAll(".lista-snacks") && document.querySelectorAll(".lista-snacks").forEach((element) => element.remove());
        document.querySelector("#a-pagar") && document.querySelector("#a-pagar").remove();
        resultados = extraerRepetidos();
        resultados[0].forEach((elemento) => {
            const snacksDIV = document.createElement("div");
            snacksDIV.classList.add("lista-snacks");
            snacksDIV.innerHTML = `<img src="assets/imagenes/${elemento[0].id}.png"><p>${elemento[1]} x ${elemento[0].nombre}</p><button class="basura" id="borrar_${elemento[0].id}"><i class="fa-solid fa-trash-can"></i></button>`;
            listadoSnacks.appendChild(snacksDIV);
            document.querySelector(`#borrar_${elemento[0].id}`).addEventListener("click", () => {
                borrarCarritoSnacks(elemento[0].id);
            });
        });
        const snacksTotales = document.createElement("div");
        snacksTotales.id = "a-pagar";
        snacksTotales.classList.add("totales");
        totalFormateado = currency(resultados[1]);
        snacksTotales.innerHTML = `<p>Total snacks: ${totalFormateado}</p>`;
        listadoSnacks.appendChild(snacksTotales);
        totalGeneral = currency(resultados[1] + totalApagarEntradas);
    } else {
        document.querySelector(".lista-snacks").innerHTML = `<p>No hay snacks seleccionados</p>`;
        document.querySelector("#titulo-snacks").remove();
        document.querySelector("#a-pagar") && document.querySelector("#a-pagar").remove();
        totalGeneral = currency(totalApagarEntradas);
    }
    document.querySelector("#total-gral") && document.querySelector("#total-gral").remove();
    const DOMtotalGeneral = document.createElement("div");
    DOMtotalGeneral.id = "total-gral";
    DOMtotalGeneral.innerHTML = `<p>Total general: ${totalGeneral}</p>`;
    listadoSnacks.append(DOMtotalGeneral);
    BOTON_PAGAR(".entradas__izquierda");
}

function enviarFormularioSelector(inputs) {
    const DOMdatospeli = document.querySelector(".entradas__datospeli");
    const DOMimagenPeli = document.querySelector(".entradas__imagen");
    DOMdatospeli.style["display"] = "none";
    DOMimagenPeli.style["display"] = "none";
    const FUNCIONELEGIDA = funciones.find((element) => element.id === inputs[1].value);
    const asientosFuncionElegida = simularOcupacion(FUNCIONELEGIDA);
    const totalLibres = cerosEnMatriz(asientosFuncionElegida);
    const entradasRequeridas = parseInt(inputs[2].value);
    if (entradasRequeridas <= totalLibres) {
        document.querySelector("#selectores").innerHTML = "";
        const ENTRADAS_RESUMEN = document.querySelector(".entradas__resumen");
        armarCarritoEntradas(FUNCIONELEGIDA, entradasRequeridas);
        dibujarEntradasResumen(ENTRADAS_RESUMEN, recuperarStorage());
        DOMplatea = document.querySelector("#contenedor-platea");
        DOMplatea.append(dibujarPlatea(asientosFuncionElegida));
        DOMplatea.style["display"] = "block";
        const divPlatea = document.querySelector("#platea");
        divPlatea.addEventListener("click", (event) => {
            seleccionDeAsientos(event, entradasRequeridas);
        });
    } else {
        sweetCantidad("mayor");
    }
}

function reordenarPelis(id) {
    let newPelis = pelis.filter((element) => element.id != id);
    newPelis.unshift(pelis[pelis.findIndex((element) => element.id === id)]);
    return newPelis;
}

function armarDOM(id = "") {
    const DOMbotonCerrar = document.querySelector(".cerrar");
    DOMbotonCerrar.addEventListener("click", () => {
        sweetCerrar()
    });
    const DOMselectorPeliculas = document.querySelector("#select__pelicula");
    DOMselectorPeliculas.appendChild(dibujarSelectorPeliculas(id));
    if (id != "") {
        dibujarSelectorFunciones(id);
        dibujarDatosPeli(id);
    }
    DOMselectorPeliculas.addEventListener("change", (event) => {
        dibujarSelectorFunciones(event.target.value);
        dibujarDatosPeli(event.target.value);
    });
    const DOMinputCantidad = document.querySelector(".entradas__cantidad");
    const DOMselectorFunciones = document.querySelector("#select__funcion");
    DOMselectorFunciones.addEventListener("change", () => DOMinputCantidad.style["display"] = "block");
    const formularioSelector = document.querySelector("#selectores");
    formularioSelector.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputs = event.target.elements;
        if (isNaN(inputs[2].value) || inputs[2].value < 1) {
            sweetCantidad();
        } else {
            enviarFormularioSelector(inputs);
        }
    });
}

function borrarTodo() {
    divEntradas = document.querySelector("#section__entradas");
    divEntradas.innerHTML = "";
    divEntradas.classList.remove("activa");
}

function sweet(id = undefined) {
    if (sessionStorage.getItem("compra")) {
        Swal.fire({
            title: 'Estás en un proceso de compra',
            icon: 'warning',
            html:
                'Si hacés click en borrar, se cerrará el proceso de compra.',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                'Borrar y empezar de nuevo',
            confirmButtonAriaLabel: 'Borrar y empezar de nuevo',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> Continuar compra actual',
            cancelButtonAriaLabel: 'Pulgar abajo'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("compra");
                mostrarTodo(id);
                armarDOM(id);
                document.querySelector("#section__entradas").classList.add("activa");
            } 
        })
    } else {
        mostrarTodo(id);
        armarDOM(id);
        document.querySelector("#section__entradas").classList.add("activa");
    }
}

function sweetCerrar() {
    if (sessionStorage.getItem("compra")) {
        Swal.fire({
            title: 'Estás en un proceso de compra',
            icon: 'warning',
            html:
                'Si hacés click en borrar, se cerrará el proceso de compra.',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Cerrar',
            confirmButtonAriaLabel: 'Cerrar',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> Continuar compra',
            cancelButtonAriaLabel: 'Pulgar abajo'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("compra");
                borrarTodo();
            } 
        })
    } else {
        borrarTodo();
    }
}

function sweetPagar() {
    let timerInterval;
    Swal.fire({
        html: "<h1>🛸</h1><p>En <b></b> milisegundos te estaremos dirigiendo a la pasarela de pagos...</p>",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
                title: "The end",
                html: "<p>Hasta acá llegó el simulador de mi proyecto para el curso de JavaScript de Coderhouse. Gracias por recorrerlo hasta el final.</p><p>Si te gustó mi trabajo y te gustaría contratarme, contactame a través de cualquiera de mis canales.</p><div class='canales'><a href='https://www.linkedin.com/in/amneriscalle/'><i class='fa-brands fa-linkedin'></i></a><a href='https://www.instagram.com/amne.calle/'><i class='fa-brands fa-instagram'></i></a><a href='mailto:amneris.calle@gmail.com'><i class='fa-regular fa-envelope'></i></a></div>",
                confirmButtonText: "Hasta la próxima 👋",
                customClass: {
                    htmlContainer: 'final',
                    title: 'title-final',
                    confirmButton: 'boton-final'
                }
            }).then((result) => {

                if (result.isConfirmed) {
                    sessionStorage.getItem("compra") && sessionStorage.removeItem("compra");
                    borrarTodo();
                }
            });
        }
    });
}

const sweetCantidad = (condicion) => {
    texto = condicion === "mayor" ? "<p>Lo sentimos, la sala no cuenta con la cantidad de entradas libres solicitada.</p><p> Ingresá una cantidad menor o, si querés organizar un evento empresarial a sala completa, escribinos a info@vintage.com</p>" : "<p>🤔 ¿No te habrás olvidado de ingresar la cantidad de entradas? ¿O habrás ingresado un número menor que 1? Para seguir adelante deberás ingresar una cantidad igual o mayor a 1.</p>"
    Swal.fire({
        icon: 'error',
        title: "Ups...",
        html: texto,
    });
}

function mostrarSnacks() {
    document.querySelector("#botones").remove();
    document.querySelector("#advertencia").remove();
    document.querySelector("#mostrar-platea").style["display"]="none";
    document.querySelector("#contenedor-platea").style["display"] = "none";
    BOTON_PAGAR(".entradas__resumen");
    document.querySelector("#mostrar-snacks").addEventListener("click",()=>{
        document.querySelector(".carrito").classList.add("ver-en-mobile")});
    document.querySelector(".carrito").innerHTML = `
        <h3>¿querés agregar snacks?</h3>
        <p>Elegí el que quieras o completá la compra de entradas sin snacks haciendo click en el botón TERMINAR</p>
        <div class="carrito__flexSnacks"></div>`;
    snacks.forEach((element) => {
        document.querySelector(".carrito__flexSnacks").appendChild(dibujarSnacksEnEntradas(element));
        document.querySelector(`#${element.id}`).addEventListener("click", (event) => {
            generarCarritoSnacks(event.target.id);
            dibujarSnacksElegidos(event.target.id);
        });
    });
}

const BOTON_PAGAR = (donde) => {
    const BOTON_PAGAR_INICIAL = document.createElement("div");
    BOTON_PAGAR_INICIAL.id = ("boton_pagar");
    BOTON_PAGAR_INICIAL.innerHTML = `<button class="boton_pagar"><i class="fa-solid fa-money-check-dollar"></i>PAGAR Y FINALIZAR COMPRA</button>`;
    const DONDE = document.querySelector(donde);
    DONDE.append(BOTON_PAGAR_INICIAL);
    BOTON_PAGAR_INICIAL.addEventListener("click", () => sweetPagar());
}

function generarCarritoSnacks(id) {
    const SNACKELEGIDO = snacks.find((element) => element.id === id);
    let snackResumido = (({ id, nombre, precio }) => ({ id, nombre, precio }))(SNACKELEGIDO);
    carrito.push(snackResumido);
    cargarStorage();
}

function borrarCarritoSnacks(id) {
    carrito.splice(carrito.findIndex((elemento) => elemento.id === id), 1);
    cargarStorage();
    dibujarSnacksElegidos();
}

function extraerRepetidos() {
    const carritoRecuperado = recuperarStorage();
    const sorted = carritoRecuperado.splice(1).sort((a, b) => {
        if (a.id < b.id) { return -1; }
        if (a.id > b.id) { return 1; }
        return 0;
    });
    const carritoSinDuplicados = [];
    carritoSinDuplicados.push([sorted[0], 1]);
    for (i = 1; i < sorted.length; i++) {
        (sorted[i].id === sorted[i - 1].id) ? carritoSinDuplicados[carritoSinDuplicados.length - 1][1]++ : carritoSinDuplicados.push([sorted[i], 1]);
    }
    const temp = carritoSinDuplicados.map((elemento) => elemento[0].precio * elemento[1]);
    const totalAPagarSnacks = temp.reduce((accumulator, elemento) => accumulator + elemento);
    const aDevolver = [carritoSinDuplicados, totalAPagarSnacks];
    return aDevolver;
}

function dibujarBotones() {
    const FRAGMENTO = new DocumentFragment();
    const BOTONES = document.createElement("div");
    BOTONES.id = "botones";
    BOTON_ACEPTAR = document.createElement("input");
    BOTON_ACEPTAR.classList.add("boton__aceptar", "boton");
    BOTON_ACEPTAR.setAttribute("value", "👍 CONFIRMAR");
    BOTON_ACEPTAR.setAttribute("type", "button");
    BOTON_CAMBIAR = document.createElement("input");
    BOTON_CAMBIAR.classList.add("boton__cambiar", "boton");
    BOTON_CAMBIAR.setAttribute("value", "👎 Empezar de nuevo");
    BOTON_CAMBIAR.setAttribute("type", "button");
    BOTONES.append(BOTON_ACEPTAR);
    BOTONES.append(BOTON_CAMBIAR);
    FRAGMENTO.appendChild(BOTONES);
    BOTON_ACEPTAR.addEventListener("click", () => {
        
        mostrarSnacks();
    });
    BOTON_CAMBIAR.addEventListener("click", () => {
        sweet();
    });
    return FRAGMENTO;
}

function dibujarEntradasResumen(ENTRADAS_RESUMEN, carrito) {
    const funcionelegida = funciones.find((element) => element.id === carrito[0].funcion);
    totalApagarEntradas = funcionelegida.precio * carrito[0].cantidad;
    const fecha = formatearDia(funcionelegida.anio, funcionelegida.mes, funcionelegida.dia);
    const pelielegida = pelis.find((element) => element.id === funcionelegida.pelicula);
    const entradasRequeridas = carrito[0].cantidad;
    ENTRADAS_RESUMEN.innerHTML = `
            <h3>resumen de lo solicitado</h3>
            <div class="resumen__datospeli">
                <div class="datospeli__item datospeli__item--left">Película </div>
                <div class="datospeli__item datospeli__item--right">${pelielegida.nombre}</div>
                <div class="datospeli__item datospeli__item--left">Duración</div>
                <div class="datospeli__item datospeli__item--right">${pelielegida.duracion}</div>
                <div class="datospeli__item datospeli__item--left">Sala</div>
                <div class="datospeli__item datospeli__item--right">${salas[funcionelegida.sala].nombre}</div>
                <div class="datospeli__item datospeli__item--left">Función</div>
                <div class="datospeli__item datospeli__item--right">${fecha}, ${funcionelegida.hora}</div>
                <div class="datospeli__item datospeli__item--left">Entradas</div>
                <div class="datospeli__item datospeli__item--right">${entradasRequeridas}</div>
                <div class="datospeli__item datospeli__item--left">Precio unitario</div>
                <div class="datospeli__item datospeli__item--right">${currency(funcionelegida.precio)}</div>
                <div class="datospeli__item datospeli__item--left">Asientos</div>
                <div class="datospeli__item datospeli__item--right asientos__elegidos"><p class="aclaracion"><i class="fa-solid fa-circle-exclamation"></i>Elegir butacas haciendo click en los asientos libres que se muestran en la platea.</p></div>
                </div>
                <button id="mostrar-platea" class="mostrar-platea"><i class="fa-solid fa-braille"></i>Ver platea</button>
                <button id="mostrar-snacks" class="mostrar-snacks"><i class="fa-solid fa-cookie-bite"></i>Ver snacks</button>
                </div>`;
                const mostrarPlatea = document.querySelector("#mostrar-platea");
                mostrarPlatea.addEventListener("click",()=> {
                    document.querySelector("#contenedor-platea").style['display']="block";
                    document.querySelector("#contenedor-platea").classList.add("full");
                } )
}

const coordenadas = (id) => {
    let guion = id.indexOf("-");
    let nrofila = parseInt(id.slice(1, guion));
    nrofila++;
    let nrocolumna = parseInt(id.slice((guion + 2), id.length));
    nrocolumna++;
    let coordenadas_asientos = "Fila: " + nrofila + " Butaca: " + nrocolumna;
    return coordenadas_asientos;
}

let asientos = [];
let salas = [];
let pelis = [];
let snacks = [];
let carrito = [];
const PRECIOBASE = 3000; //valor de precio indicado desde el backend
let funciones = [];
let carritoEntradas = {};
let totalApagarEntradas;



