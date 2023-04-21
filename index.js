const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const authController = require("./auth/auth.controller");
authController(app);

const fileUpload = require("express-fileupload");
app.use(fileUpload());

const movieRouter = require("./movie/movie.router.js");
app.use("/movie", movieRouter);
app.get("/", (request, response) => response.redirect("/movie"));
app.use(express.static(__dirname));
app.listen(1337, () => console.log("Server listen on port 1337"));
