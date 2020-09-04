import { RECEIVE_USERS } from '../actions/user_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USERS:
            let newObj = {};
            action.users.data.forEach(user => {
                newObj[user._id] = user;
            });
            return newObj;
        default:
            return state;
    }
}