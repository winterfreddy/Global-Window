import * as FavoriteAPIUtil from '../util/favorites_api_util';

export const RECEIVE_PHOTO_FAVORITES = "RECEIVE_PHOTO_FAVORITES";
export const RECEIVE_FAVORITE = 'RECEIVE_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const RECEIVE_USER_FAVES = "RECEIVE_USER_FAVES";

const receiveFavorite = favorite => ({
    type: RECEIVE_FAVORITE,
    favorite
});

const removeFavorite = id => ({
    type: REMOVE_FAVORITE,
    id
});

const receivePhotoFavorites = (favorites) => ({
  type: RECEIVE_PHOTO_FAVORITES,
  favorites,
});

const receiveUserFaves = photoIds => ({
    type: RECEIVE_USER_FAVES,
    photoIds
})

export const makeFavorite = favorite => dispatch => (
    FavoriteAPIUtil.makeFavorite(favorite)
        .then(favorite => dispatch(receiveFavorite(favorite)))
);

export const unFavorite = id => dispatch => (
    FavoriteAPIUtil.unFavorite(id)
        .then(() => dispatch(removeFavorite(id)))
);

export const fetchPhotoFavorites = id => dispatch => (
    FavoriteAPIUtil.fetchPhotoFavorites(id)
        .then(favorite => dispatch(receivePhotoFavorites(favorite)))
); 

export const fetchUserFaves = id => dispatch => (
    FavoriteAPIUtil.fetchUserFaves(id)
        .then(photoIds => dispatch(receiveUserFaves(photoIds)))
)