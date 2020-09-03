import { RECEIVE_FAVORITE, REMOVE_FAVORITE } from '../actions/favorite_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_FAVORITE:
            newState[action.favorite.photoId] = action.favorite;
            return newState;
        case REMOVE_FAVORITE:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};



