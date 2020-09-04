import {
  RECEIVE_FAVORITE,
  REMOVE_FAVORITE,
  RECEIVE_USER_FAVES,
} from "../actions/favorite_actions";

export default function (state = {}, action) {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_USER_FAVES:
            console.log(action.photoIds.data)
            let newObj = {};
            action.photoIds.data.forEach(favorites => {
                newObj[favorites.photoId] = favorites;
            });
            // return action.photoIds.data;
            return newObj;
        case RECEIVE_FAVORITE:
            console.log(action.favorite.data)
            newState[action.favorite.data.photoId] = action.favorite.data;
            return newState;
        case REMOVE_FAVORITE:
            console.log('hitting unfave reducer')
            console.log(action.id)
            console.log(newState[action.id])
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};
