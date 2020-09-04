import { 
    RECEIEVE_ALL_PHOTOS, 
    RECEIVE_PHOTO, 
    REMOVE_PHOTO 
} from '../actions/photo_actions';
import { RECEIVE_PHOTO_FAVORITES } from "../actions/favorite_actions";

export default function (state = {}, action) {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case RECEIEVE_ALL_PHOTOS:
            const photosObj = {};
            action.photos.data.forEach(photo => {
                photosObj[photo._id] = photo;
            });
            return photosObj; //an array of photos
        case RECEIVE_PHOTO:
            newState[action.photo.data._id] = action.photo.data;
            return newState;
        case REMOVE_PHOTO:
            delete newState[action.id];
            return newState;
        case RECEIVE_PHOTO_FAVORITES:
            let photoObj;
            let favoritesLength;
            let appendedObj;
            if (!action.favorites.data[0]) {
              photoObj = newState[action.favorites.data.photoId];
              favoritesLength = 0;
              appendedObj = { ...photoObj, numFavorites: favoritesLength };
              newState[action.favorites.data.photoId] = appendedObj;
            } else {
              photoObj = newState[action.favorites.data[0].photoId];
              favoritesLength = action.favorites.data.length;
              appendedObj = { ...photoObj, numFavorites: favoritesLength };
              newState[action.favorites.data[0].photoId] = appendedObj;
            }
            return newState;
        default:
            return state;
    }
};

// {
//     photos: {#234512: photoObj1}
// }