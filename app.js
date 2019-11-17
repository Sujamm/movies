const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
var bestMovies = [];
var movies = [];
var upcomingMovies = [];
var tvShows = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    var url = "http://www.omdbapi.com/?s=harry+potter&apikey=fc1d3669";
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            bestMovies = data["Search"];
            res.render("index", { bestMovies: bestMovies });
        }
    });
});

app.get("/:p/s", (req, res) => {
    var page = req.params.p;
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=";
    if (page === "tvshows") {
        console.log("This comes from Tv Shows");
        url = url + query +
            "&type=series&apikey=fc1d3669";
    } else if (page === "movies") {
        console.log("This comes from Movies");
        url = url + query +
            "&type=movie&apikey=fc1d3669";
    } else {
        console.log("This comes from Index");
        url = url + query +
            "&apikey=fc1d3669";
    }
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            bestMovies = data["Search"];
            res.render(page, { bestMovies: bestMovies });
        }
    });
});

app.get("/movies", (req, res) => {
    var url = "http://www.omdbapi.com/?s=star+wars&type=movie&apikey=fc1d3669";
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            bestMovies = data["Search"];
            res.render("movies", { bestMovies: bestMovies });
        }
    });
});

app.get("/tvshows", (req, res) => {
    var url = "http://www.omdbapi.com/?s=one+tree+hill&type=series&apikey=fc1d3669";
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            bestMovies = data["Search"];
            res.render("tvshows", { bestMovies: bestMovies });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running");
});