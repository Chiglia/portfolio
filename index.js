const express = require('express')
const mysql = require('mysql2');
var path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.ENV_PORT;

const mysqlConfig = {
  host: process.env.ENV_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}

let con =  mysql.createConnection(mysqlConfig);

con.connect((error) => {
    if (error) {
      console.log(error)
    }
    else console.log("Connected to the database...")
  });

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  res.render('index');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Pagina non trovata'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

