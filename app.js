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
    console.log(typeof(page));
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query +
        "&apikey=fc1d3669"
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            bestMovies = data["Search"];
            res.render(page, { bestMovies: bestMovies });
        }
    });
});

app.get("/upcoming", (req, res) => {
    var url = "http://www.omdbapi.com/?s=harry+potter&apikey=fc1d3669";
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            upcomingMovies = data["Search"];
            res.render("upcoming", { bestMovies: upcomingMovies });
        }
    });
});

app.get("/movies", (req, res) => {
    res.render("movies");
});

app.get("/tvshows", (req, res) => {
    res.render("tvshows");
});

app.listen(3000, () => {
    console.log("Server running");
});