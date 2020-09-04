const User = require("./models/User");
const bcrypt = require("bcryptjs");
const Photo = require("./models/Photo");
const Point = require("./models/Point");
const strftime = require("strftime");
const Favorite = require("./models/Favorite");

function seedEvents(req, res) {
    console.log("starting seeding");
    const users = [
        {username: 'DemoUser', password: '123456'},
        {username: 'AdamK', password: 'password'},
        {username: 'KevinZ', password: 'password'},
        {username: 'WinfredH', password: 'password'},
        {username: 'AlexC', password: 'password'},
        {username: 'techgeek12', password: 'password'},
        {username: 'doglover3', password: 'password'},
        {username: 'catperson99', password: 'password'},
        {username: 'appacademician', password: 'password'},
        {username: 'hunter12', password: 'password'},
        {username: 'bobsaget74', password: 'password'},
        {username: 'cleverUsername', password: 'password'},
        {username: 'memesgirl44', password: 'password'},
        {username: 'riley8', password: 'password'},
        {username: 'i_main_jett', password: 'password'},
        {username: 'csgoPlayer5', password: 'password'},
        {username: 'surferchick12', password: 'password'},
        {username: 'mariofan43', password: 'password'},
        {username: 'pikachu', password: 'password'},
        {username: 'UserTwenty', password: 'password'},
    ];

    const createdUsers = [];
    
     users.forEach(userInfo => {
        const newUser = new User(userInfo);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(() => createdUsers.push(newUser));
                console.log('userid: ', newUser._id);
            });
        });
    })

    const createEverythingElse = () => {
      const photos = [
        {
          description: "SF Skyline",
          coordinates: { lat: 37.78678804194593, lng: -122.39041603634031 },
          tags: ["buildings", "skyline", "sf"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/01-photo.jpeg`,
        },
        {
          description: "Golden Gate Bridge",
          coordinates: { lat: 37.820175, lng: -122.478981},
          tags: ["sf", "architecture"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/02-photo.jpeg`,
        },
        {
          description: "Berkeley Trails",
          coordinates: { lat: 37.905441, lng: -122.244532},
          tags: ["nature", "berkeley"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/03-photo.jpeg`,
        },
        {
          description: "Statue of Liberty",
          coordinates: { lat: 37.78678804194593, lng: -122.39041603634031 },
          tags: ["ny", "monuments"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/04-photo.jpeg`,
        },
        {
          description: "Fall Weather in Boston",
          coordinates: { lat: 42.354886, lng: -71.064742},
          tags: ["boston", "nature"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/05-photo.jpeg`,
        },
        // {
        //   description: "Space Needle",
        //   coordinates: { lat: 47.620487, lng: -122.349333 },
        //   tags: ["seattle", "buildings", "architecture"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/06-photo.jpeg`,
        // },
        // {
        //   description: "Mt Rushmore",
        //   coordinates: { lat: 43.879068, lng: -103.458663 },
        //   tags: ["rushmore", "monuments"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/07-photo.jpeg`,
        // },
        // {
        //   description: "Eiffel Tower",
        //   coordinates: { lat: 48.858342, lng: 2.294417 },
        //   tags: ["paris", "france", "monuments", "architecture"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/08-photo.jpeg`,
        // },
        // {
        //   description: "Angkor Wat",
        //   coordinates: { lat: 13.412365, lng: 103.866986 },
        //   tags: ["cambodia", "monuments", "architecture"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/09-photo.jpeg`,
        // },
        // {
        //   description: "Astronomical Clock",
        //   coordinates: { lat: 50.087028, lng: 14.420599 },
        //   tags: ["prague", "monuments", "architecture"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/010-photo.jpeg`,
        // },
        // {
        //   description: "Piazza San Marco",
        //   coordinates: { lat: 45.434125, lng: 12.338402 },
        //   tags: ["venice", "italy", "architecture"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/011-photo.jpeg`,
        // },
        // {
        //   description: "Casa Batllo",
        //   coordinates: { lat: 41.391629, lng: 2.164935 },
        //   tags: ["barcelona", "spain", "architecture"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/012-photo.jpeg`,
        // },
        // {
        //   description: "Santorini",
        //   coordinates: { lat: 36.461668, lng: 25.37624 },
        //   tags: ["oia", "greece", "architecture"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/013-photo.jpeg`,
        // },
        // {
        //   description: "Painted Ladies",
        //   coordinates: { lat: 37.776168, lng: -122.432809 },
        //   tags: ["sf", "buildings", "architecture"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/014-photo.jpeg`,
        // },
        // {
        //   description: "Strawberry Hill",
        //   coordinates: { lat: 37.768773, lng: -122.475506 },
        //   tags: ["sf", "nature"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/015-photo.jpeg`,
        // },
        // {
        //   description: "Fisherman's Wharf",
        //   coordinates: { lat: 37.80915, lng: -122.415714 },
        //   tags: ["sf", "pier"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/016-photo.jpeg`,
        // },
        // {
        //   description: "Baker Beach",
        //   coordinates: { lat: 37.793511, lng: -122.483811 },
        //   tags: ["sf", "beach"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/017-photo.jpeg`,
        // },
        // {
        //   description: "Lake Merritt",
        //   coordinates: { lat: 37.808554, lng: -122.249783 },
        //   tags: ["oakland", "lake", "merritt"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/018-photo.jpeg`,
        // },
        // {
        //   description: "Oakland Zoo",
        //   coordinates: { lat: 37.750094, lng: -122.146736 },
        //   tags: ["oakland", "lake", "merritt"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/019-photo.jpeg`,
        // },
        // {
        //   description: "Evil Corp",
        //   coordinates: { lat: 37.483132, lng: -122.150063 },
        //   tags: ["facebook", "capitalism", "tech"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/020-photo.jpeg`,
        // },
        // {
        //   description: "Redwood Hikes",
        //   coordinates: { lat: 38.031316, lng: -122.733937 },
        //   tags: ["nature", "redwoods", "marin"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/021-photo.jpeg`,
        // },
        // {
        //   description: "Napa Vineyards",
        //   coordinates: { lat: 38.031316, lng: -122.733937 },
        //   tags: ["nature", "napa", "winery", "vineyard"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/022-photo.jpeg`,
        // },
        // {
        //   description: "Coffee Shop",
        //   coordinates: { lat: 33.75472, lng: -84.381577 },
        //   tags: ["coffee", "atlanta"],
        //   imageURL:
        //     "https://global-window-project-dev.s3-us-west-1.amazonaws.com/023-photo.jpeg",
        // },
        // {
        //   description: "Ponce City Market",
        //   coordinates: { lat: 33.772834, lng: -84.364636 },
        //   tags: ["market", "shopping"],
        //   imageURL:
        //     "https://global-window-project-dev.s3-us-west-1.amazonaws.com/024-photo.jpeg",
        // },
        // {
        //   description: "Graduation",
        //   coordinates: { lat: 33.766026, lng: -84.356592 },
        //   tags: ["graduation", "portrait"],
        //   imageURL:
        //     "https://global-window-project-dev.s3-us-west-1.amazonaws.com/025-photo.jpeg",
        // },
        // {
        //   description: "Rivers and building",
        //   coordinates: { lat: 41.838214, lng: -87.684365 },
        //   tags: ["river", "buildings"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/026-photo.jpeg`,
        // },
        // {
        //   description: "Wrigley Field",
        //   coordinates: { lat: 41.948955, lng: -87.655179 },
        //   tags: ["baseball"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/027-photo.jpeg`,
        // },
        // {
        //   description: "Ferris Wheel",
        //   coordinates: { lat: 41.876619, lng: -87.624903 },
        //   tags: ["ferris wheel"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/028-photo.jpeg`,
        // },
        // {
        //   description: "Carnival",
        //   coordinates: { lat: 41.883196, lng: -87.620586 },
        //   tags: ["fun", "family"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/029-photo.jpeg`,
        // },
        // {
        //   description: "Chicago Theater",
        //   coordinates: { lat: 41.885357, lng: -87.62791 },
        //   tags: ["entertainment", "fun"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/030-photo.jpeg`,
        // },
        // {
        //   description: "Skyline",
        //   coordinates: { lat: 41.870864, lng: -87.629929 },
        //   tags: [],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/031-photo.jpeg`,
        // },
        // {
        //   description: "The Bean",
        //   coordinates: { lat: 41.882468, lng: -87.623095 },
        //   tags: ["sights", "tourist", "landmark"],
        //   imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/032-photo.jpeg`,
        // },
        // {
        //   description: "White Building",
        //   coordinates: { lat: 39.752705, lng: -104.990467 },
        //   tags: ["buildings", "sightseeing"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/033-photo.jpeg",
        // },
        // {
        //   description: "Coors Field",
        //   coordinates: { lat: 39.756112, lng: -104.993696 },
        //   tags: ["baseball", "sports", "family"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/034-photo.jpeg",
        // },
        // {
        //   description: "Welcome to Colorful Colorado",
        //   coordinates: { lat: 39.193351, lng: -109.051181 },
        //   tags: ["sightseeing", "landmark"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/035-photo.jpeg",
        // },
        // {
        //   description: "Wine Time",
        //   coordinates: { lat: 39.72784, lng: -104.810436 },
        //   tags: ["drinks", "relax"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/036-photo.jpeg",
        // },
        // {
        //   description: "Texas Sign",
        //   coordinates: { lat: 30.409412, lng: -97.719774 },
        //   tags: ["texas", "neon"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/037-photo.jpeg",
        // },
        // {
        //   description: "Lifeguard Hut",
        //   coordinates: { lat: 25.885661, lng: -80.120788 },
        //   tags: ["beach", "vacation"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/038-photo.jpeg",
        // },
        // {
        //   description: "Ultra Miami",
        //   coordinates: { lat: 26.328992, lng: -80.094986 },
        //   tags: ["party", "music", "edm"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/039-photo.jpeg",
        // },
        // {
        //   description: "Freeways",
        //   coordinates: { lat: 26.118581, lng: -80.339856 },
        //   tags: ["signs"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/040-photo.jpeg",
        // },
        // {
        //   description: "Sunsets",
        //   coordinates: { lat: 26.135427, lng: -80.142019 },
        //   tags: ["sunset", "roads"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/041-photo.jpeg",
        // },
        // {
        //   description: "Subway",
        //   coordinates: { lat: 40.769085, lng: -73.95814 },
        //   tags: ["subway", "train"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/042-photo.jpeg",
        // },
        // {
        //   description: "Brooklyn Bridge",
        //   coordinates: { lat: 40.702566, lng: -73.99095 },
        //   tags: ["sightseeing", "tourist"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/043-photo.jpeg",
        // },
        // {
        //   description: "View from Brooklyn Bridge",
        //   coordinates: { lat: 40.705771, lng: -73.996356 },
        //   tags: ["bridge, landmark"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/044-photo.jpeg",
        // },
        // {
        //   description: "Night Skyline",
        //   coordinates: { lat: 40.724664, lng: -73.994253 },
        //   tags: ["night", "skyline", "ny"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/045-photo.jpeg",
        // },
        // {
        //   description: "Times Square",
        //   coordinates: { lat: 40.757678, lng: -73.985806 },
        //   tags: ["ny", "sunset"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/046-photo.jpeg",
        // },
        // {
        //   description: "Empire State in the Fog",
        //   coordinates: { lat: 40.748179, lng: -73.986072 },
        //   tags: ["building", "fog"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/047-photo.jpeg",
        // },
        // {
        //   description: "Flatiron Building",
        //   coordinates: { lat: 40.740914, lng: -73.990235 },
        //   tags: ["building", "ny"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/048-photo.jpeg",
        // },
        // {
        //   description: "Chips",
        //   coordinates: { lat: 39.965712, lng: -83.001815 },
        //   tags: ["food", "salsa"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/049-photo.jpeg",
        // },
        // {
        //   description: "Fogged Atlanta Skyline",
        //   coordinates: { lat: 33.743709, lng: -84.424312 },
        //   tags: ["skyline", "atlanta"],
        //   imageURL: "https://global-window-project-dev.s3-us-west-1.amazonaws.com/050-photo.jpeg",
        // },
      ];
      
      const createdPhotos = [];

      photos.forEach((photoInfo, idx) => {
        const point = new Point({
          coordinates: [photoInfo.lng, photoInfo.lat],
          type: "Point",
        });

        const newPhoto = new Photo({
          creatorId:
            createdUsers[Math.floor(Math.random() * createdUsers.length)],
          description: photoInfo.description,
          imageURL: photoInfo.imageURL,
          coordinates: photoInfo.coordinates,
          location: point,
          tags: photoInfo.tags,
          created: strftime("%b %d, %Y, %l:%M %P"),
        });
        // console.log("photoId: ", newPhoto._id);
        newPhoto.save();
        createdPhotos.push(newPhoto);
      });

      for (let i = 0; i < 20; i++) {
        const photoId =
          createdPhotos[Math.floor(Math.random() * createdPhotos.length)]._id;
        const favoriterId =
          createdUsers[Math.floor(Math.random() * createdUsers.length)]._id;

        // console.log("photoid: ", photoId);
        // console.log("favid: ", favoriterId);

        Favorite.find({ photoId: photoId, favoriterId: favoriterId }).then(
          (fav) => {
            console.log("fav: ", fav);
            if (!fav.length) {
              newFav = new Favorite({
                photoId: photoId,
                favoriterId: favoriterId,
              });
              console.log(newFav);
              newFav.save();
            }
          }
        );
      }
    }
    setTimeout(createEverythingElse, 5000);
}

module.exports = seedEvents;
