var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var sequelize = require('./config/database');
var indexRouter = require('./routes/index');
var compteRouter = require('./routes/compte');
var annonceRouter = require('./routes/annonce');
var reservationRouter = require('./routes/reservation');
const cors = require('cors');

var app = express();


app.use(helmet()); // Sécurité
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/compte',compteRouter)
app.use('/annonce',annonceRouter)
app.use('/reservation',reservationRouter)

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error response in JSON format
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;