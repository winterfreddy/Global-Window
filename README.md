# Global Window

[Global Window Live Link](https://global-window.herokuapp.com/#/home)

Global Window is a social media web app to display geo-tagged photos. Users can look around the Google Maps overlay, where geo-tagged photos appear as a marker, and the corresponding photo appears on the sidebar. Users are allowed to upload their own photos, select a location on the Google Maps overlay, and add information about the photo. After uploading, the image and its marker will appear on the Google Maps overlay for other users to see.



## Technologies

### Frontend:

- **React/Redux**
- **Google Maps JavaScript API** - Overlay to display markers on Google Maps

### Backend:

- **Express.js**
- **Node.js**
- **MongoDB** 
- **AWS S3** - Stores photos uploaded by users
- **GeoJSON** - Helps to filter photos based on location



## Frontend Feature: Displaying Number of Favorites for Photos

Implementing the favorites feature was tricky because we were running into issues trying to retrieve the Favorite documents from the database. So we chose to count the number of Favorite documents with the same photoId, and render the number of favorites per photo. However, we later ran into more issues with favoriting and unfavoriting a photo because the Axios calls to the backend were concerned with a favorite's ID and the frontend had no easy way of grabbing that information to make the appropriate fetches. So, we made changes to both the backend routes and frontend reducers so that we could then grab the favorites with a photoId instead, and our favorites slice of state would then update properly upon favoriting and unfavoriting. 

Below is a code snippet of how we achieved favoriting and unfavoriting in this project: 

```javascript
handleFavorites() {
    const { 
        favorites, 
        photo, 
        currentUserId, 
        makeFavorite, 
        unFavorite, 
        fetchPhotos,
        fetchPhoto
    } = this.props;
    let clickAction;
    if (favorites[photo._id] !== undefined) {
        if (favorites[photo._id].favoriterId === currentUserId) {
            clickAction = unFavorite(favorites[photo._id].photoId)
                .then(photoId => fetchPhoto(photoId.id.data))
                .catch(err => console.log(err.response));
        } else {
        }
    } else {
        clickAction = makeFavorite({ photoId: photo._id })
            .then(photo => fetchPhoto(photo.favorite.data.photoId)).catch(err => console.log(err));
    } 
    return clickAction;
}
```



## Backend Feature: GeoJSON

Ideally, Global Window only displays photos based on the current search area, as opposed to loading every photo document in the database. Our team thought about comparing the coordinates of each photo to 2 coordinates that are passed in from the frontend. This meant we would have to do 4 coordinate comparisons per photo object. Although it would work, we decided to look into libraries that could assist us with searching. Eventually, we found the GeoJSON library very helpful.

To search for photos in a specified area, we utilized the GeoJSON library. GeoJSON creates 'location' objects, which have an associated latitude and longitude. GeoJSON also creates 'polygon' objects. When given coordinates as bounds, these polygon objects create a search area to find the mentioned location objects. With these location objects and polygons, we can associate a location to each uploaded Photo object, we are able to check if a Photo's location object falls within a specified polygon. 

```js
const searchArea = {
  type: "Polygon",
  coordinates: [
      [
        [northValue, westValue], // Comes from req.query
        [southValue, westValue],
        [southValue, eastValue],
        [northValue, eastValue],
        [northValue, westValue],
      ],
  ],
};
// Optional search for tags
let search;
if (req.query.tags) {
    search = req.query.tags
} else {
    search = { $exists: true }
}

Photo.find({ 
    location: {
      $geoWithin: {
        $geometry: searchArea,
      },
    },
    tags: search
        
})
```



Upon searching for Photo objects, the frontend finds the North-East and South-West coordinates of the current Google Maps overlay. The backend receives these coordinates to create a polygon object and defines our search parameters. Once the polygon is initialized, all photo location objects whose coordinates are within the polygon will be returned to the frontend.



## Future Features

In later versions of the app, we would like to add:
  - a profile page for each user, displaying photos they have uploaded and favorited
  - more robust and flexible search functionality, such as the option to search by popularity or multiple tags at once

NB: Currently, clicking on a photo's 'locate' button will break the map's search functionality, requiring the page to be reloaded. This is a bug we are aware of and hope to fix eventually.