const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const keys = require("./config/keys");
const { Client, Status } = require("@googlemaps/google-maps-services-js");


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

// PASSPORT
app.use(passport.initialize());
require("./config/passport")(passport);

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", users);
// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// GOOGLE MAPS
const client = new Client({});

// Makes call to that specific location
client
  .elevation({
    params: {
      locations: [{ lat: 37.736155, lng: -122.508014 }],
      key: keys.mapsAPIKey,
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data);
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });


// COMMENT HERE
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// const initMaps = () => {
//   // The location of Uluru
//   var uluru = {
//     lat: -25.344,
//     lng: 131.036
//   };
//   // The map, centered at Uluru
//   var map = new google.maps.Map(
//     document.getElementById('map'), {
//     zoom: 4,
//     center: uluru
//   });
//   // The marker, positioned at Uluru
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   });

// };