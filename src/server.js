const express = require('express');
require ('./config/database');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


const host = process.env.APP_HOST;
const api_version = process.env.API_VERSION;





require("../src/controllers/user.controller")(app);
require("../src/controllers/dashbord.controller")(app);


 // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  
  const PORT = process.env.APP_PORT || 3004;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});
