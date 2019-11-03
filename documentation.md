
# Playlist Forum

---

Name: Divya Gupta

Date: Nov 2, 2019

Project Topic: Website where users can upload playlists/information about playlists, and view which other playlists have been uploaded. The website displays a cover image to go along with the picture, as well as title, curator, number songs, and tags.

URL: https://playlist-forum.herokuapp.com/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Title               `Type: String`
- `Field 2`: Link to Playlist    `Type: String`
- `Field 3`: Number of Songs     `Type: Number`
- `Field 4`: Tags                `Type: [String]`
- `Field 5`: Artist Compilation? `Type: Boolean`
- `Field 6`: Curator             `Type: String`
- `Field 6`: Link to Cover (img) `Type: String`

Schema: 
```javascript
{
  title: String,
  link: String,
  numSongs: Number,
  tags: [String],
  isArtistComp: Boolean,
  curator: String,
  cover: String
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        title: "Chill",
        link: "https://open.spotify.com/playlist/5CZM27oqcR8tZH2aTB04bi?si=9Vt2Xk84RKiqNn8aAL-Jzg",
        numSongs: 71,
        tags: [
            "chill",
            "mellow"
        ],
        isArtistComp: false,
        curator: "Divya Gupta",
        cover: "https://f4.bcbits.com/img/a2170386826_10.jpg"
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getPlaylists`
GET navigation filter endpoint routes: 
`/api/Mood`,
`/api/Mood/:subgroup`,
`/api/Artists`,
`/api/Length`,
`/api/Curator`,
`/api/Curator/:subgroup`,
`/api/Random`

### 4. Search Data

Search Field: `title of playlist`
GET search api: `/search/:query`

### 5. Navigation Pages

Navigation Filters
1. Mood -> `  /Mood  `
2. Artists -> `  /Artists  `
3. Length -> `  /Length  `
4. Curator -> `  /Curator  `
5. Random -> `  /Random  `

