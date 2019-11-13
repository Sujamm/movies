const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Server running");
});