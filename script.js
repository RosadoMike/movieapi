//Referencias iniciales
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");


// Función para recuperar datos de la API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // Si el campo de entrada está vacío
    if (movieName.trim().length === 0) {
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
    } else {
        // Obtener datos de la pelicula
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // Si el nombre de la pelicula existe en la base de datos
                if (data.Response === "True") {
                    result.innerHTML = `
                    <div class="info">
                        <img src="${data.Poster}" class="poster" alt="Movie Poster">
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <span>⭐</span>
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    </div>
                    `;
                } else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);


fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        // Si la pelicula existe en la base de datos
        if (data.Response == "True") {
            result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <h2>${data.Title}</h2>
                <div class="rating">
                    <img src="star-icon.svg">
                    <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                </div>
                <div class="genre">
                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
            </div>
            `;
        }
        // Si la pelicula no existe en la base de datos
        else {
            result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
    })
    // Si ocurre un error
    .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
    });