import * as PhotoAPIUtil from '../util/photos_api_util';

export const RECEIVE_PHOTO = "RECEIVE_PHOTO";

const receivePhoto = photo => ({
    type: RECEIVE_PHOTO,
    photo
});

export const uploadPhoto = photo => dispatch => (
    PhotoAPIUtil.uploadPhoto(photo)
        .then(photo => dispatch(receivePhoto(photo)))
        .catch(error => console.log(error))
);