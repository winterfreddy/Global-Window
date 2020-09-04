import * as PhotoAPIUtil from '../util/photos_api_util';

export const RECEIEVE_ALL_PHOTOS = "RECEIEVE_ALL_PHOTOS";
export const RECEIVE_PHOTO = "RECEIVE_PHOTO";
export const REMOVE_PHOTO = 'REMOVE_PHOTO';


const receivePhotos = photos => ({
    type: RECEIEVE_ALL_PHOTOS,
    photos
})

const receivePhoto = photo => ({
    type: RECEIVE_PHOTO,
    photo
});

const removePhoto = id => ({
    type: REMOVE_PHOTO,
    id
})

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

export const editPhoto = photo => dispatch => (
    PhotoAPIUtil.editPhoto(photo)
        .then(photo => dispatch(receivePhoto(photo)))
        .catch(error => console.log(error))
)

export const deletePhoto = id => dispatch => (
    PhotoAPIUtil.deletePhoto(id)
        .then(() => dispatch(removePhoto(id)))
        .catch(error => console.log(error))
)
 