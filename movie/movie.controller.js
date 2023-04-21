const { request } = require("express");
const movieModel = require("./movie.model");
const movieView = require("./movie.view");

function listAction(request, response) {
  movieModel
    .getAll()
    .then((resp) => {
      if (request.user) {
        response.send(movieView.renderList(resp, request.user));
      } else {
        response.send(movieView.renderList(resp, ""));
      }
    })
    .catch(() => {
      response.redirect("/movie/error");
    });
}

function removeAction(request, response) {
  movieModel
    .remove(request.params.id, request.user.username)
    .then(() => {
      response.redirect(request.baseUrl);
    })
    .catch(() => {
      response.send(movieView.deletError(request.user));
    });
}

function editAction(request, response) {
  let movie = { id: "-1", title: "", year: "", public: false, owner: "" };
  if (request.params.id) {
    movieModel
      .get(request.params.id)
      .then((resp) => {
        movie = resp[0];
        response.send(movieView.renderMovie(movie, request.user));
      })
      .catch(() => {
        response.redirect("/movie/error");
      });
  } else {
    response.send(movieView.renderMovie(movie, request.user));
  }
}

function saveAction(request, response) {
  let public = false;
  if (request.body.public) {
    public = true;
  }
  const movie = {
    id: request.body.id,
    title: request.body.title,
    year: request.body.year,
    public: public,
    owner: request.user.username,
  };
  movieModel
    .save(movie)
    .then(() => {
      response.redirect(request.baseUrl);
    })
    .catch((err) => {
      if (err == "Movie already exists") {
        response.send(movieView.renderEditError(request.user));
      } else {
        response.redirect("/movie/error");
      }
    });
}

function importAction(request, response) {
  if (!request.files || !request.files.importfile) {
    response.send(movieView.renderImporterror(request.user, "Keine Datei angegeben"));
  } else {
    movieModel
      .saveImports(request.files.importfile, request.user.username)
      .then((resp) => {
        response.send(movieView.renderImporterror(request.user, resp));
      })
      .catch(() => {
        response.redirect("/movie/error");
      });
  }
}

function importFormAction(request, response) {
  response.send(movieView.renderImportForm(request.user));
}

function dbErrorAction(request, response) {
  response.send(movieView.renderdbError(request.user));
}

module.exports = {
  listAction,
  removeAction,
  editAction,
  saveAction,
  importAction,
  importFormAction,
  dbErrorAction,
};
