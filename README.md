
# Playlist Forum

---

Name: Divya Gupta

Date: Nov 2, 2019

Project Topic: Website where users can upload playlists/information about playlists, and view which other playlists have been uploaded. The website displays a cover image to go along with the picture, as well as title, curator, number songs, and tags.

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     ...       `Type: ...`
- `Field 2`:     ...       `Type: ...`
- `Field 3`:     ...       `Type: ...`
- `Field 4`:     ...       `Type: ...`
- `Field 5`:     ...       `Type: ...`

Schema: 
```javascript
{
   ...
}
```

### 2. Add New Data

HTML form route: `/...`

POST endpoint route: `/api/...`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       ...
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/...`

### 4. Search Data

Search Field: ...

### 5. Navigation Pages

Navigation Filters
1. name -> `  route  `
2. ... -> `  ...  `
3. ... -> `  ...  `
4. ... -> `  ...  `
5. ... -> `  ...  `