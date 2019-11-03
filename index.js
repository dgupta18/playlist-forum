var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var _ = require("underscore");

var _DATA = dataUtil.loadData().playlists;
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get('/',function(req,res){
  res.render('home', {
    data: _DATA,
    onHome: true
  });
});

app.get('/api/getPlaylists', function(req,res){
  res.json(_DATA)
});

app.get("/create", function (req, res) {
  res.render('create', {
    onCreate: true,
    onHome: false,
  });
});

app.post("/create", function (req, res) {
  var body = req.body;
  var newPlaylist = {};
  newPlaylist["title"] = body.title;
  newPlaylist["link"] = body.link;
  newPlaylist["numSongs"] = parseInt(body.numSongs);
  newPlaylist["tags"] = body.tags.toString().split(" ");
  newPlaylist["isArtistComp"] = body.isArtistComp;
  newPlaylist["author"] = body.author;
  newPlaylist["cover"] = body.cover;

  console.log(newPlaylist);

  _DATA.push(newPlaylist)
  dataUtil.saveData(_DATA);
  res.redirect("/");
});


app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
