const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2RiMDc1NmFhYjVmNmJiM2U5YmFlNDM3NmIzNGVlMCIsInN1YiI6IjY1NDI5MTE5YTU4OTAyMDE1N2Q0MDZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1R05w7B8DOpyfGmMoBjv1cEJmNwe4nGy8629sd2kPSM'
  }
};

const section__api = document.querySelector("#section__api");
const boton_cerrar = document.querySelector(".section__api--cerrar");
boton_cerrar.addEventListener("click", () => {
  showError.innerHTML = "";
  datosPelicula.innerHTML = "";
  showError.style['display']="none";
  section__api.style['display'] = "none";
});

const loader = document.querySelector(".loader");
const showError = document.querySelector("#showError");
const datosPelicula = document.querySelector("#datosPelicula");
const errorHandler = (error, dedonde) => {
  showError.style['display']="block";
  showError.innerHTML = "<p>Lo sentimos, hubo un error en la carga de datos.</p><p class='mensaje'>Mensaje de error del sistema: '" + error + "'</p><p class='mensaje'>En función " + dedonde + "</p>";
};

let resultado_pelicula = {};

async function apitmdb(id) {
  section__api.style["display"] = "block";
  const apiURL = 'https://api.themoviedb.org/3/find/' + id + '?external_source=imdb_id&language=es-ES';
  await fetchapitmdb(apiURL);
}

const fetchapitmdb = async (apiURL) => {
  loader.style['display'] = "block";
  await fetch(apiURL, options)
    .then(async (response) => await response.json())
    .then(async (response) => {
      resultado_pelicula = (({ id, title, original_title, overview, poster_path, popularity, release_date }) => ({ id, title, original_title, overview, poster_path, popularity, release_date }))(response.movie_results[0]);
      dibujarDatosApi(resultado_pelicula);
      await buscarCreditosPeli(resultado_pelicula.id);
    })
    .catch((error) => {
      errorHandler(error, "fetchapitmdb");
    })
    .finally(loader.style['display'] = "none");
}

async function buscarCreditosPeli(id) {
  loader.style['display'] = "block";
  const apiURL = 'https://api.themoviedb.org/3/movie/' + id + '/credits?language=es-ES';
  await fetch(apiURL, options)
    .then(async (response) => await response.json())
    .then(response => {
      const cast = response.cast;
      cast.splice(10);
      const crew = response.crew;
      const director = crew.find(({ job }) => job === "Director");
      let i = 0;
      const cast_resumido = [];
      cast.forEach((elemento) => {
        cast_resumido[i] = (({ id, name, original_name, popularity, profile_path, character }) => ({ id, name, original_name, popularity, profile_path, character }))(elemento);
        i++;
      });
      dibujarCast(cast_resumido, director);
    })
    .catch(error => errorHandler(error, "buscarCreditosPeli"))
    .finally(loader.style['display'] = "none");
}

async function buscarInfoActores(id) {
  const apiURL = 'https://api.themoviedb.org/3/person/' + id + '?language=es-ES';
  await fetch(apiURL, options)
    .then(async (response) => await response.json())
    .then((response) => {
      const perfil = (({ id, name, biography, birthday, homepage, popularity, place_of_birth, profile_path }) => ({ id, name, biography, birthday, homepage, popularity, place_of_birth, profile_path }))(response);
      mostrarPerfil(perfil);
    })
    .catch((error) => errorHandler(error, "buscarInfoActores"));
}

function mostrarPerfil(persona) {
  let datos_perfil = `<h2>🎭</h2><h3>${persona.name}</h3>`;
  if (persona.date_of_birth) { datos_perfil += `<p class="en_sweet"><strong>Fecha de nacimiento:</strong> ${persona.date_of_birth}</p>` }
  if (persona.place_of_birth) { datos_perfil += `<p class="en_sweet"><strong>Lugar de nacimiento:</strong> ${persona.place_of_birth}</p>` };
  if (persona.biography) { datos_perfil += `<p class="en_sweet"><strong>Biografía:</strong> ${persona.biography}</p>` };
  if (persona.popularity) { datos_perfil += `<p class="en_sweet"><strong>Popularidad:</strong> ${persona.popularity}</p>` };
  Swal.fire({
    html: datos_perfil,
    focusConfirm: false,
    width:800,
    confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> ¡Excelente!`,
    confirmButtonAriaLabel: "Thumbs up, great!",
  });
}

function dibujarDatosApi(resultado) {
  const URLposter = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/';
  let datos_movie = `
  <div class="section__titulo--api">
    <h4><i class="fa-solid fa-film"></i> ${resultado.title} </h4>
  </div>
  <div class="datos_pelicula">
  <div class="poster_pelicula"><img src="${URLposter}${resultado.poster_path}"/></div>
  <div class="info_pelicula">
  <div class="row_info_pelicula">
  <div class="col1_info_pelicula"><h4>Título original</h4></div>
  <div class="col2_info_pelicula"><p>${resultado.original_title}</p></div>
  </div>
  <div class="row_info_pelicula">
  <div class="col1_info_pelicula"><h4>Fecha de estreno</h4></div>
  <div class="col2_info_pelicula"><p>${resultado.release_date}</p></div>
  </div>
  <div class="row_info_pelicula">
  <div class="col1_info_pelicula"><h4>Trama</h4></div>
  <div class="col2_info_pelicula"><p>${resultado.overview}</p></div>
  </div>
  <div class="row_info_pelicula">
  <div class="col1_info_pelicula"><h4>Popularidad</h4></div>
  <div class="col2_info_pelicula"><p>${resultado.popularity}</p></div>
  </div>
  <div class="row_info_pelicula">
  <div class="col1_info_pelicula"><h4>Director</h4></div>
  <div class="col2_info_pelicula"><p id='directores'></p></div>
  </div>`;
  datos_movie += "</div></div>";
  datos_movie += "<div id='actores'></div>";
  datosPelicula.innerHTML = datos_movie;
}

function dibujarCast(resultado, director) {
  const section__director = document.querySelector("#directores");
  section__director.innerText = director.name;
  const section__actores = document.querySelector("#actores");
  let creditos = "<h2>Actores</h2><p>[Se muestran sólo los primeros diez]</p><div class='contenedor_tarjetas'>";
  resultado.forEach((elemento) => {
    const URLactor = elemento.profile_path ? `https://www.themoviedb.org/t/p/w276_and_h350_face/`+elemento.profile_path:`assets/imagenes/fotoNN.jpg`;
    creditos += `<div class='card_actor'> 
    <img src="${URLactor}" />
    <h4>${elemento.name}</h4>
    <p>${elemento.character}</p>
    <button class='boton-ver-mas' id='actor_${elemento.id}'>Más info <i class="fa-solid fa-circle-info"></i></button>
    <div class='perfilActor' id='perfil${elemento.id}'></div></div>`;
  });
  creditos += "</div>";
  section__actores.innerHTML = creditos;
  botonesActores = document.querySelectorAll(".boton-ver-mas");
  botonesActores.forEach((elemento) => {
    const newID = elemento.id.split("_").pop();
    elemento.addEventListener("click", () => buscarInfoActores(newID));
  })
}

