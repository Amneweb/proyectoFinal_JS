(sessionStorage.getItem("compra")) && sessionStorage.removeItem("compra");
const botonEntradas = document.querySelectorAll(".comprar_entradas");
botonEntradas.forEach((element) => element.addEventListener("click", () => {
    sweet();
}
));

pelis.forEach((elemento) => {
    const peliculaEnCartelera = document.createElement("div");
    peliculaEnCartelera.className = "cartelera__div--imagen";
    const poster = document.createElement("img");
    poster.src = `assets/imagenes/peliculas/${elemento.id}.jpg`;
    poster.className = "cartelera__img";
    peliculaEnCartelera.append(poster);
    const overlay = document.createElement("div");
    overlay.className = "cartelera__div--overlay";
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
    const botonFetch = document.createElement("div");
    botonFetch.className = "cartelera__boton";
    botonFetch.id = elemento.imdbID;
    botonFetch.innerText = "ver más (*)";
    botonFetch.style.cursor = "pointer";
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
    botonCartelera.addEventListener("click", (event) => sweet(event.target.id));
    botonFetch.addEventListener("click", (event) => apitmdb(event.target.id));
});

const sectionSnacks = document.querySelector(".snacks");
snacks.forEach((element) => sectionSnacks.appendChild(dibujarSnacks(element)));
