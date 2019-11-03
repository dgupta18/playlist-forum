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
app.use(bodyParser.urlencoded({ extended: true }));
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
    onHome: true,
  });
});

app.get('/api/getPlaylists', function(req,res){
  res.json(_DATA)
});

app.get("/create", function (req, res) {
  res.render('create', {
    onCreate: true,
    onHome: false
  });
});

app.post("/create", function (req, res) {
  var body = req.body;

  body.numSongs = parseInt(body.numSongs);
  body.tags = body.tags.toString().split(" ");
  body.isArtistComp = body.isArtistComp === "true";

  console.log(body);

  _DATA.push(body)
  dataUtil.saveData(_DATA);
  res.redirect("/");
});

app.post("/api/create", function (req, res) {
  var body = req.body;

  console.log(body);

  body.numSongs = parseInt(body.numSongs);
  body.tags = body.tags.toString().split(" ");
  body.isArtistComp = body.isArtistComp === "true";

  _DATA.push(body);
  dataUtil.saveData(_DATA);
  res.redirect("/");
});

app.get("/Mood", function(req,res){
  var tags = dataUtil.getAllTags(_DATA);
  console.log(tags);
  var mood = true;
  
  console.log(mood);

  res.render('home', {
    data: tags,
    filter: "Mood",
    group: true,
    onHome: false,
    onCreate: false,
    mood: mood
  });
});

app.get("/api/Mood", function(req,res){
  var tags = dataUtil.getAllTags(_DATA);
  res.json(tags);
});

app.get("/Curator", function(req,res){
  var curators = new Set();
  _.each(_DATA, function(elem) {
    curators.add(elem.curator);
  })
  console.log(curators);
  var curator = true;

  res.render('home', {
    data: Array.from(curators),
    filter: "Curator",
    group: true,
    onHome: false,
    onCreate: false, 
    curator: curator
  });
});

app.get("/api/Curator", function (req, res) {
  var curators = new Set();
  _.each(_DATA, function (elem) {
    curators.add(elem.curator);
  })

  res.json(Array.from(curators));
})

app.get("/Mood/:subgroup", function(req,res) {
  var retArr = [];
  var _subgroup = req.params.subgroup;

  _.each(_DATA, function(elem){
    if (elem.tags.includes(_subgroup)) {
      retArr.push(elem);
    }
  })

  res.render('home', {
    data: retArr,
    filter: _subgroup,
    onHome: false,
    onCreate: false
  });
});

app.get("/api/Mood/:subgroup", function(req,res){
  var _subgroup = req.params.subgroup;
  var retArr = [];

  _.each(_DATA, function(elem){
    if (elem.tags.includes(_subgroup)) {
      retArr.push(elem);
    }
  })

  res.json(retArr);
});

app.get("/Curator/:subgroup", function(req,res) {
  var _subgroup = req.params.subgroup;
  var retArr = [];

  _.each(_DATA, function(elem){
    if (elem.curator === _subgroup) {
      retArr.push(elem);
    }
  })

  res.render('home', {
    data: retArr,
    filter: _subgroup,
    onHome: false,
    onCreate: false
  });
});

app.get("/api/Curator/:subgroup", function (req, res) {
  var _subgroup = req.params.subgroup;
  var retArr = [];

  _.each(_DATA, function (elem) {
    if (elem.curator === _subgroup) {
      retArr.push(elem);
    }
  })

  res.json(retArr);
})

app.get("/Artist", function(req,res){
  var retArr = [];
  
  _.each(_DATA, function(elem){
    if (elem.isArtistComp) {
      retArr.push(elem);
    }
  })

  res.render('home', {
    data: retArr,
    filter: "Artist",
    onHome: false,
    onCreate: false
  })
})

app.get("/api/Artist", function (req, res) {
  var retArr = [];

  _.each(_DATA, function (elem) {
    if (elem.isArtistComp) {
      retArr.push(elem);
    }
  })

  res.json(retArr);
})

app.get("/Length", function(req,res){
  var retArr = _.clone(_DATA);
  retArr.sort(function(b,a){
    return a.numSongs > b.numSongs ? 1 : (a.numSongs === b.numSongs) ? ((a.title > b.title) ? 1 : -1) : -1 ;
  });

  res.render('home', {
    data: retArr,
    filter: "Length",
    onHome: false,
    onCreate: false
  });
})

app.get("/api/Length", function(req,res){
  var retArr = _.clone(_DATA);
  retArr.sort(function (b, a) {
    return a.numSongs > b.numSongs ? 1 : (a.numSongs === b.numSongs) ? ((a.title > b.title) ? 1 : -1) : -1;
  });
  
  res.json(retArr);
})

app.get("/Random", function (req, res) {
  var rand = _DATA[Math.floor(Math.random() * _DATA.length)];

  res.render('home', {
    data: [rand],
    filter: "Random",
    onHome: false,
    onCreate: false,
  });
});

app.get("/api/Random", function(req,res){
  var rand = _DATA[Math.floor(Math.random() * _DATA.length)];

  res.json(rand);
})

app.get("/search/:query", function(req,res){
  var _query = req.params.query.toLowerCase();
  var retArr = [];

  console.log("QUERY: " + _query)

  _.each(_DATA, function(elem){
    if (elem.title.toLowerCase().startsWith(_query)) {
      retArr.push(elem);
    }
  })

  console.log(retArr);

  res.send(retArr);
})

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port 3000!');
});
