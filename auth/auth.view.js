function login(error) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Movielist</title>
    </head>
    <body>
        <p>
        ${error ? "Username or password wrong" : ""}
        </p>
        <form action="/login" method="POST">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value="sepp" autofocus>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value="sepp">
            </div>
            <input type="submit" value="Login">
        </form>
    </body>
    </html>`;
}

module.exports = { login };
