import * as FavoriteAPIUtil from '../util/favorites_api_util';

export const RECEIVE_FAVORITE = 'RECEIVE_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const receiveFavorite = favorite => ({
    type: RECEIVE_FAVORITE,
    favorite
});

const removeFavorite = id => ({
    type: REMOVE_FAVORITE,
    id
});

export const favorite = favorite => dispatch => (
    FavoriteAPIUtil.favorite(favorite)
        .then(() => dispatch(receiveFavorite(favorite)))
);

export const unFavorite = id => dispatch => (
    FavoriteAPIUtil.unfavorite(id)
        .then(() => dispatch(removeFavorite(id)))
);