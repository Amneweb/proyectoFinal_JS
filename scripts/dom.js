(sessionStorage.getItem("compra")) && sessionStorage.removeItem("compra");
const botonEntradas = document.querySelectorAll(".comprar_entradas");
botonEntradas.forEach((element) => element.addEventListener("click", () => {
    sweet();
}
));
const botonAbrir = document.querySelector("#boton-abrir-nav");
const botonCerrar= document.querySelector("#boton-cerrar-nav");
const navegacion=document.querySelector (".nav");
const enlaces=document.querySelectorAll(".nav__a"); 
botonAbrir.addEventListener("click",()=>navegacion.classList.add("visible"));
botonCerrar.addEventListener("click",()=>navegacion.classList.remove("visible"));
enlaces.forEach((enlace)=> enlace.addEventListener("click",()=>navegacion.classList.remove("visible"))) ;
document.querySelector("#boton-entradas").addEventListener("click",()=>navegacion.classList.remove("visible")) ;
pelis.forEach((elemento) => {
    const peliculaEnCartelera = document.createElement("div");
    peliculaEnCartelera.className = "cartelera__div--imagen";
    const poster = document.createElement("img");
    poster.src = `assets/imagenes/peliculas/${elemento.id}.jpg`;
    poster.className = "cartelera__img";
    peliculaEnCartelera.append(poster);
    const botonVerOverlay=document.createElement("button");
    botonVerOverlay.classList.add("boton-ver-overlay");
    botonVerOverlay.addEventListener("click",()=>overlay.classList.add("overlay_activa"));
    botonVerOverlay.innerHTML=`<i class="fa-solid fa-circle-info"></i>`;
    peliculaEnCartelera.append(botonVerOverlay);
    const overlay = document.createElement("div");
    overlay.className = "cartelera__div--overlay";
    const botonCerrarOverlay=document.createElement("button");
    botonCerrarOverlay.classList.add("boton-cerrar-overlay");
    botonCerrarOverlay.addEventListener("click",()=>overlay.classList.remove("overlay_activa"));
    botonCerrarOverlay.innerHTML=`<i class="fa-solid fa-xmark"></i>`;
    overlay.append(botonCerrarOverlay);
    const texto = document.createElement("div");
    texto.className = "cartelera__datospeli";
    texto.append(armarDatosPeli(elemento, texto));
    overlay.append(texto);
    const contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("contenedorBotones");
    const botonCartelera = document.createElement("div");
    botonCartelera.className = "cartelera__boton";
    botonCartelera.id = elemento.id;
    botonCartelera.innerText = "elegir";
    botonCartelera.style.cursor = "pointer";
    botonCartelera.addEventListener("click", (event) => sweet(event.target.id));
    const botonFetch = document.createElement("div");
    botonFetch.className = "cartelera__boton";
    botonFetch.id = elemento.imdbID;
    botonFetch.innerText = "ver más (*)";
    botonFetch.style.cursor = "pointer";
    botonFetch.addEventListener("click", (event) => {
        overlay.classList.remove("activa");
        apitmdb(event.target.id)} );
    contenedorBotones.append(botonFetch);
    contenedorBotones.append(botonCartelera);
    overlay.append(contenedorBotones);
    const tmdb = document.createElement("div");
    tmdb.classList.add("tmdb");
    const tmdbP = document.createElement("p");
    tmdbP.innerText = "(*) Powered by THE MOVIE DATABASE";
    tmdb.append(tmdbP);
    overlay.append(tmdb);
    peliculaEnCartelera.append(overlay);
    document.querySelector(".cartelera__contenedor").appendChild(peliculaEnCartelera);
    
    
});

const sectionSnacks = document.querySelector(".snacks");
snacks.forEach((element) => sectionSnacks.appendChild(dibujarSnacks(element)));
