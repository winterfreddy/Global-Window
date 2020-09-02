import * as PhotoAPIUtil from '../util/photos_api_util';

export const RECEIEVE_ALL_PHOTOS = 'RECEIEVE_ALL_PHOTOS';
export const RECEIVE_PHOTO = "RECEIVE_PHOTO";

const receivePhotos = photos => ({
    type: RECEIEVE_ALL_PHOTOS,
    photos
})

const receivePhoto = photo => ({
    type: RECEIVE_PHOTO,
    photo
});


export const fetchPhotos = () => dispatch => (
    PhotoAPIUtil.fetchPhotos()
    .then(photos => dispatch(receivePhotos(photos)))
    .catch(error => console.log(error))
);
    
export const fetchPhoto = id => dispatch => (
    PhotoAPIUtil.fetchPhoto(id)
    .then((photo) => dispatch(receivePhoto(photo)))
    .catch(error => console.log(error))
);

export const uploadPhoto = photo => dispatch => (
    PhotoAPIUtil.uploadPhoto(photo)
        .then(photo => dispatch(receivePhoto(photo)))
        .catch(error => console.log(error))
);