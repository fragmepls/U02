function renderList(movies, user) {
  let ret = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Movielist</title>
  </head>`;
  ret += `<body>
  <p style='background-color: blue; color: white;'>${
    user ? `Logged in as ` + user.username : "Not logged in."
  }</p>
  <div>
  ${
    user
      ? `<a href='/logout'>Logout</a> <a href='/movie/edit'>New movie</a>`
      : `<a href='/login'>Login</a>`
  }
    <table style='border-collapse: collapse; width: 100%; text-align: left; width: 100%; margin-top: 20px'>
    <tr style='background-color: blue; color: white; height:30px'><th>Title</th><th>Year</th><th>Public</th><th colspan=2>Owner</th></tr></tr>`;
  for (let movie of movies) {
    if (user.username == movie.owner) {
      ret += `<tr style="border-bottom: 1px solid black; height: 30px">
      <td>${movie.title}</td><td>${movie.year}</td>
      <td>${movie.public ? "Yes" : "No"}</td><td>${movie.owner}</td>
      <td><a href="/movie/remove/${movie.id}">Delete</a> <a href="/movie/edit/${movie.id}">Edit</a>
      </td></tr>`;
    } else {
      if (movie.public) {
        ret += `<tr style="border-bottom: 1px solid black; height: 30px">
        <td>${movie.title}</td><td>${movie.year}</td>
        <td>${movie.public ? "Yes" : "No"}</td><td>${movie.owner}</td>
        </td><td><a href="/movie/view/${movie.id}">View</a>
        </td></tr>`;
      }
    }
  }
  ret += `</table>
    ${
      user
        ? `<div style='margin-top: 20px'><a href="/movie/edit">New</a> <a href="/movie/import">Import</a></div>`
        : ""
    }
    </body>
    </html>
    `;
  return ret;
}
function renderMovie(movie, user) {
  let ret = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Movielist</title>
    </head>
    <body>`;
  if (user && movie && (movie.owner == "" || movie.owner == user.username)) {
    ret = `
    <p style='background-color: blue; color: white;'>${
      user ? `Logged in as ` + user.username : "Not logged in."
    }</p>
      <div>
      <a href='/logout'>Logout</a> <a href='/movie/edit'>New movie</a>
      <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 20px;'></div>
      </div>
      <form action="/movie/save" method="post">
      <input type="hidden" name="id" value="${movie.id}">
      <table>
        <tr>
          <td><label for="title">Title:</label></td>
          <td><input type="text" id="title" name="title"
          value="${movie.title}"></td>
        </tr>
        <tr>
          <td><label for="year">Year:</label></td>
          <td><input type="number" id="year" name="year"
          value="${movie.year}"></td>
        </tr>
        <tr>
          <td><label for="public">Public: </label></td>
          <td>`;
    if (movie.public) {
      ret += `<input type="checkbox" id="public" name="public" value="true" checked>`;
    } else {
      ret += `<input type="checkbox" id="public" name="public" value="true">`;
    }
    ret += `</td>
        </tr>
        <tr>
          <td><label>Owner:</label></td>
          <td><input type="text" disabled
          value="${movie.owner ? movie.owner : user.username}"></td>
        </tr>
      </table>
      <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 5px;'></div>
      <div>
      <input type="submit" value="Save">
      <a href='/movie'>Back</a>
      </div>
      </form>
      </body>`;
  } else {
    if (movie && movie.public) {
      ret = `<body>
      <p style='background-color: blue; color: white;'>${
        user ? `Logged in as ` + user.username : "Not logged in."
      }</p>
      <div style='margin-bottom: 20px'>
      <a href='${user ? "/logout" : "/login"}'>${
        user ? "Logout" : "Login"
      }</a> <a href='/movie/edit'>New movie</a>
      </div>
      <table style="border-collapse: collapse; width: 100%; text-align: left">
      <tr style="border-bottom: 1px solid black; border-top: 2px solid black; height: 30px">
        <td>Title:  </td>
        <td style='width: 98%; padding-left: 2%'>${movie.title}</td>
      </tr>
      <tr style="border-bottom: 1px solid black; height: 30px">
        <td>Year:  </td>
        <td style='width: 98%; padding-left: 2%'>${movie.year}</td>
      </tr>
      <tr style="border-bottom: 1px solid black; height: 30px">
        <td>Public:  </td>
        <td style='width: 98%; padding-left: 2%'>${movie.public}</td>
      </tr>
      <tr style="border-bottom: 2px solid black; height: 30px">
        <td>Owner:  </td>
        <td style='width: 98%; padding-left: 2%'>${movie.owner}</td>
      </tr>
      </table>
      <div style='margin-top: 10px'><a href='/movie'>Back</a></div>
      </body>`;
    } else {
      ret = `<body>
      <p style='background-color: blue; color: white;'>${
        user ? `Logged in as ` + user.username : "Not logged in."
      }</p>
      <div style='margin-bottom: 20px'>
      <a href='${user ? "/logout" : "/login"}'>${
        user ? "Logout" : "Login"
      }</a> <a href='/movie/edit'>New movie</a>
      </div>
      <table style="border-collapse: collapse; width: 100%; text-align: left">
      <tr style="border-bottom: 2px solid black; border-top: 2px solid black; height: 30px">
      <td>N/A</td>
      </tr>
      </table>
      <div style='margin-top: 10px'><a href='/movie'>Back</a></div>
      </body></html>`;
    }
  }
  return ret;
}

function deletError(user) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Movielist</title>
  </head><body>
      <p style='background-color: blue; color: white; height: 30px;'>Loggein as ${user.username}</p>
      <div style='margin-bottom: 20px'>
      <a href='/logout'>Logout</a> <a href='/movie/edit'>New movie</a>
      </div>
      <table style="border-collapse: collapse; width: 100%; text-align: left">
      <tr style="border-bottom: 2px solid black; border-top: 2px solid black; height: 30px">
        <td>Could not delete.</td>
      </tr>
      </table>
      <div style='margin-top: 10px'><a href='/movie'>Back</a></div>
      </body></html>`;
}

function renderImporterror(user, errorstring) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Movielist</title>
  </head>
  <body>
  <p style='background-color: blue; color: white; height: 30px;'>Logged in as ${user.username}</p>
  <div>
  <a href='/logout'>Logout</a> <a href='/movie/edit'>New movie</a>
  <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 20px;'></div>
  </div>
  <h3>${errorstring}</h3>
  <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 10px;'></div>
  <div style='margin-top: 10px'><a href='/movie'>Back</a></div>
  </body>
  </html>`;
}

function renderImportForm(user) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Movielist</title>
  </head>
  <body>
  <p style='background-color: blue; color: white; height: 30px;'>Logged in as ${user.username}</p>
  <div>
  <a href='/logout'>Logout</a> <a href='/movie/edit'>New movie</a>
  <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 20px;'></div>
  </div>
  <form action="/movie/import " method="post" enctype="multipart/form-data">
  <label for="importfile">Import:</label>
  <input type="file" id="importfile" name="importfile">
  <input type="submit" value="Import">
  </form>
  <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 10px;'></div>
  <div style='margin-top: 10px'><a href='/movie'>Back</a></div>
  </body>
  </html>`;
}

function renderdbError(user) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Movielist</title>
  </head>
  <body>
  <p style='background-color: blue; color: white;'>${
    user ? `Logged in as ` + user.username : "Not logged in."
  }</p>
  <div>
  ${user ? `<a href='/logout'>Logout</a>` : `<a href='/login'>Login</a>`}
  <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 20px;'></div>
  </div>
  <p>Die Web-Anwendung ist momentan überlastet. Probieren Sie es später erneut...</p>
  <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 10px;'></div>
  <div style='margin-top: 10px'><a href='/movie'>Back</a><a href="javascript:window.location.reload(true)" style='margin-left: 5px'>Retry</a></div> 
  </body>
  </html>`;
}

function renderEditError(user) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Movielist</title>
  </head>
  <body>
  <p style='background-color: blue; color: white;'>${
    user ? `Logged in as ` + user.username : "Not logged in."
  }</p>
  <div>
  ${user ? `<a href='/logout'>Logout</a>` : `<a href='/login'>Login</a>`}
  <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 20px;'></div>
  </div>
  <p>Title already exists</p>
  <div style='height: 1px; width: 100%; background-color: blue; margin-top: 20px; margin-bottom: 10px;'></div>
  <div style='margin-top: 10px'><a href='/movie'>Back</a></div> 
  </body>
  </html>`;
}

module.exports = {
  renderList,
  renderMovie,
  deletError,
  renderImporterror,
  renderImportForm,
  renderdbError,
  renderEditError,
};
