"use strict";

class Filmcollectie {
    #naam;
    #films = [];
    constructor(naam) {
        this.#naam = naam;
    }
    voegFilmToe(film) {
        this.#films.push(film);
    }
    getNaam() {
        return this.#naam;
    }
    getFilms() {
        return this.#films;
    }
}

class Film {
    #beschrijving;
    #cast = [];
    #duur;
    #filmNr;
    #foto;
    #genres = [];
    #rating;
    #regisseur;
    #release;
    #titel;
    constructor(beschrijving, duur, filmNr, foto, rating, regisseur, release, titel) {
        this.#beschrijving = beschrijving;
        this.#duur = duur;
        this.#filmNr = filmNr;
        this.#foto = foto;
        this.#rating = rating;
        this.#regisseur = regisseur;
        this.#release = release;
        this.#titel = titel;
    }
    voegCastToe(cast) {
        this.#cast.push(cast);
    }
    voegGenreToe(genre) {
        this.#genres.push(genre);
    }
    getBeschrijving() {
        return this.#beschrijving;
    }
    getDuur() {
        return this.#duur;
    }
    getCast() {
        return this.#cast;
    }
    getFilmNr() {
        return this.#filmNr;
    }
    getFoto() {
        return this.#foto;
    }
    getGenres() {
        return this.#genres;
    }
    getRating() {
        return this.#rating;
    }
    getRegisseur() {
        return this.#regisseur;
    }
    getRelease() {
        return this.#release;
    }
    getTitel() {
        return this.#titel;
    }
}

class Cast {
    #acteur;
    constructor(acteur) {
        this.#acteur = acteur;
    }
    getActeur() {
        return this.#acteur;
    }
}

class Genre {
    #genre;
    constructor(genre) {
        this.#genre = genre;
    }
    getGenre() {
        return this.#genre;
    }
}

let filmCollectie = new Filmcollectie("collectie");
fetch('movies_nows.json')
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            let date = JSON.stringify(data[i].release);
            let release = date.slice(10, 20);
            let film = new Film(
                data[i].beschrijving,
                data[i].duur,
                data[i].filmNr,
                data[i].foto,
                data[i].rating,
                data[i].regisseur,
                release,
                data[i].titel,
            );
            filmCollectie.voegFilmToe(film);
            if (data[i].cast) {
                for (let j = 0; j < data[i].cast.length; j++) {
                    let cast = new Cast(data[i].cast[j].acteur);
                    film.voegCastToe(cast);
                }
            }
            if (data[i].genres) {
                for (let k = 0; k < data[i].genres.length; k++) {
                    let genres = new Genre(data[i].genres[k]);
                    film.voegGenreToe(genres);
                }
            }
        }
        let films = filmCollectie.getFilms();
        let filmArray = 0;
        let vorige = document.getElementById("vorige");
        let volgende = document.getElementById("volgende");
        let cast = films[filmArray].getCast();
        let genres = films[filmArray].getGenres();
        let ul = document.createElement("ul");
        document.getElementById("titel").innerHTML = films[filmArray].getTitel() + "<small>(" + films[filmArray].getFilmNr() + ")</small>";
        document.getElementById("foto").src = "movies/" + films[filmArray].getFoto();
        document.getElementById("foto").alt = films[filmArray].getTitel();
        document.getElementById("beschrijving").innerHTML = films[filmArray].getBeschrijving();
        document.getElementById("regisseur").innerHTML = films[filmArray].getRegisseur();
        document.getElementById("duurtijd").innerHTML = films[filmArray].getDuur();
        document.getElementById("release").innerHTML = films[filmArray].getRelease();
        document.getElementById("rating").innerHTML = films[filmArray].getRating();
        document.getElementById("cast").appendChild(ul);
        for (let i = 0; i < cast.length; i++) {
            let li = document.createElement("li");
            ul.appendChild(li);
            li.innerHTML = cast[i].getActeur();
        }
        for (let j = 0; j < genres.length; j++) {
            if (j < genres.length - 1) {
                document.getElementById("genres").insertAdjacentHTML("beforeend", genres[j].getGenre() + ", ");
            } else {
                document.getElementById("genres").insertAdjacentHTML("beforeend", genres[j].getGenre());
            }
        }
        if (filmArray == 0) {
            vorige.disabled = true;
        }
        if (filmArray == films.length - 1) {
            volgende.disabled = true;
        }
        volgende.addEventListener("click", function () {
            filmArray++;
        });
    });