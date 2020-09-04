const User = require("./models/User");
const bcrypt = require("bcryptjs");
const Photo = require("./models/Photo");
const Point = require("./models/Point");
const strftime = require("strftime");
const Favorite = require("./models/Favorite");

function seedEvents(req, res) {
    console.log("starting seeding");
    const users = [
        {username: 'demo', password: '123456'},
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
          coordinates: { lat: 37.78678804194593, lng: -122.39041603634031 },
          tags: ["sf", "architecture"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/02-photo.jpeg`,
        },
        {
          description: "Berkeley Trails",
          coordinates: { lat: 37.78678804194593, lng: -122.39041603634031 },
          tags: ["nature", "berkeley"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/03-photo.jpeg`,
        },
        {
          description: "Statue of Liberty",
          coordinates: { lat: 37.78678804194593, lng: -122.39041603634031 },
          tags: ["nyc", "monuments"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/04-photo.jpeg`,
        },
        {
          description: "Fall Weather in Boston",
          coordinates: { lat: 37.78678804194593, lng: -122.39041603634031 },
          tags: ["boston", "nature"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/05-photo.jpeg`,
        },
        {
          description: "Space Needle",
          coordinates: { lat: 47.620487, lng: -122.349333 },
          tags: ["seattle", "buildings", "architecture"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/06-photo.jpeg`,
        },
        {
          description: "Mt Rushmore",
          coordinates: { lat: 43.879068, lng: -103.458663 },
          tags: ["rushmore", "monuments"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/07-photo.jpeg`,
        },
        {
          description: "Eiffel Tower",
          coordinates: { lat: 48.858342, lng: 2.294417 },
          tags: ["paris", "france", "monuments", "architecture"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/08-photo.jpeg`,
        },
        {
          description: "Angkor Wat",
          coordinates: { lat: 13.412365, lng: 103.866986 },
          tags: ["cambodia", "monuments", "architecture"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/09-photo.jpeg`,
        },
        {
          description: "Astronomical Clock",
          coordinates: { lat: 50.087028, lng: 14.420599 },
          tags: ["prague", "monuments", "architecture"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/010-photo.jpeg`,
        },
        {
          description: "Piazza San Marco",
          coordinates: { lat: 45.434125, lng: 12.338402 },
          tags: ["venice", "italy", "architecture"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/011-photo.jpeg`,
        },
        {
          description: "Casa Batllo",
          coordinates: { lat: 41.391629, lng: 2.164935 },
          tags: ["barcelona", "spain", "architecture"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/012-photo.jpeg`,
        },

        // {
        //   description: "",
        //   coordinates: { lat: 37.78678804194593, lng: -122.39041603634031 },
        //   tags: ["building", "skyline"],
        // },
        // {
        //   description: "",
        //   coordinates: { lat: 39.71795182399807, lng: -104.90419438169397 },
        //   tags: ["airplane", "tesla"],
        // },
        // {
        //   description: "",
        //   coordinates: { lat: 37.7862453865336, lng: -122.45187080928953 },
        //   tags: [],
        // },
        // 026-photo.jpeg

        {
          // 026-photo.jpeg
          description: "Rivers and building",
          coordinates: { lat: 41.838214, lng: -87.684365 },
          tags: ["river", "buildings"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/026-photo.jpeg`,
        },
        {
          description: "Wrigley Field",
          coordinates: { lat: 41.948955, lng: -87.655179 },
          tags: ["baseball"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/027-photo.jpeg`,
        },
        {
          description: "Ferris Wheel",
          coordinates: { lat: 41.876619, lng: -87.624903 },
          tags: ["ferris wheel"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/028-photo.jpeg`,
        },
        {
          description: "Carnival",
          coordinates: { lat: 41.883196, lng: -87.620586 },
          tags: ["fun", "family"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/029-photo.jpeg`,
        },
        {
          description: "Chicago Theater",
          coordinates: { lat: 41.885357, lng: -87.62791 },
          tags: ["entertainment", "fun"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/030-photo.jpeg`,
        },
        {
          description: "Skyline",
          coordinates: { lat: 41.870864, lng: -87.629929 },
          tags: [],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/031-photo.jpeg`,
        },
        {
          // 032
          description: "The Bean",
          coordinates: { lat: 41.882468, lng: 87.623095 },
          tags: ["sights", "tourist", "landmark"],
          imageURL: `https://global-window-project-dev.s3-us-west-1.amazonaws.com/032-photo.jpeg`,
        }, // end Chicago
        {
          description: "White Building",
          coordinates: { lat: 39.752705, lng: -104.990467 },
          tags: ["buildings", "sightseeing"],
          imageURL:
            "https://global-window-project-dev.s3-us-west-1.amazonaws.com/033-photo.jpeg",
        },
        {
          description: "Coors Field",
          coordinates: { lat: 39.756112, lng: -104.993696 },
          tags: ["baseball", "sports", "family"],
          imageURL:
            "https://global-window-project-dev.s3-us-west-1.amazonaws.com/034-photo.jpeg",
        },
        {
          description: "Welcome to Colorful Colorado",
          coordinates: { lat: 39.193351, lng: -109.051181 },
          tags: ["sightseeing", "landmark"],
          imageURL:
            "https://global-window-project-dev.s3-us-west-1.amazonaws.com/035-photo.jpeg",
        },
        {
          description: "Wine Time",
          coordinates: { lat: 39.72784, lng: -104.810436 },
          tags: ["drinks", "relax"],
          imageURL:
            "https://global-window-project-dev.s3-us-west-1.amazonaws.com/036-photo.jpeg",
        },
        {
          description: "Texas Sign",
          coordinates: { lat: 30.409412, lng: -97.719774 },
          tags: ["texas", "neon"],
          imageURL:
            "https://global-window-project-dev.s3-us-west-1.amazonaws.com/037-photo.jpeg",
        },
        {
          description: "Lifeguard Hut",
          coordinates: { lat: 25.885661, lng: -80.120788 },
          tags: ["beach", "vacation"],
          imageURL:
            "https://global-window-project-dev.s3-us-west-1.amazonaws.com/038-photo.jpeg",
        },
        {
          description: "Ultra Miami",
          coordinates: { lat: 26.328992, lng: -80.094986 },
          tags: ["party", "music", "edm"],
          imageURL:
            "https://global-window-project-dev.s3-us-west-1.amazonaws.com/0039-photo.jpeg",
        },
        {
          description: "Freeways",
          coordinates: { lat: 26.118581, lng: -80.339856 },
          tags: ['signs'],
          imageURL:
            "https://global-window-project-dev.s3-us-west-1.amazonaws.com/040-photo.jpeg",
        },
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
        console.log("photoId: ", newPhoto._id);
        newPhoto.save();
        createdPhotos.push(newPhoto);
      });

      console.log(createdUsers);
      console.log(createdPhotos);
      console.log(Math.floor(Math.random() * createdUsers.length));
      console.log(Math.floor(Math.random() * createdPhotos.length));

      for (let i = 0; i < 30; i++) {
        const photoId =
          createdPhotos[Math.floor(Math.random() * createdPhotos.length)]._id;
        const favoriterId =
          createdUsers[Math.floor(Math.random() * createdUsers.length)]._id;

        console.log("photoid: ", photoId);
        console.log("favid: ", favoriterId);

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
