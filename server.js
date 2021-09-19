require('dotenv').config();

const debug = require('debug')('app:server');
const express = require('express');
const hbs = require('express-handlebars');
const config = require('config');
const moment = require('moment');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();
app.engine(   
  'handlebars',
  hbs({
    helpers: {
      formatDate: (date) => (date ? moment(date).format('ll') : ''),
      formatDatetime: (date) => (date ? moment(date).format('lll') : ''),
      fromNow: (date) => (date ? moment(date).fromNow() : ''),
      not: (value) => !value,
      isNull: (value) => value == null,
      notEq: (a, b) => a != b,
      eq: (a, b) => a == b,
      or: (a, b) => a || b,
      and: (a, b) => a && b,
      tern: (condition, a, b) => (condition ? a : b),
      once: (conditional, options) => {
        if (conditional) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      }
    },
  })
  );
app.set('view engine', 'handlebars');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('tiny'));

app.get('/', (req, res) => res.redirect('/home'));
app.use('/home', require('./routes/home'));
app.get('/resume', function(req, res){
  //res.download('C:/Users/jonat/Desktop/Jons-portfolio/public/Jonathan_Courson.pdf', function(error){
  //    console.log("Error : ", error)
  //});
  res.download(path.join(__dirname, "public/Jonathan_Courson.pdf"));
  

});
 

app.use('/', express.static('public'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/animate.css', express.static('node_modules/animate.css'))
app.use('/wow.js', express.static('node_modules/wow.js/dist'));

app.use(require('./middleware/error404'));
app.use(require('./middleware/error500'));

const hostname = config.get('http.hostname');
const port = config.get('http.port');
app.listen(port, () => {
  debug(`Server running at http://${hostname}:${port}/`);
});
