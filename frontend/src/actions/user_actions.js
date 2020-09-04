import * as UserAPIUtil from '../util/users_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const fetchUsers = () => dispatch => (
    UserAPIUtil.fetchUsers()
        .then(users => dispatch(receiveUsers(users)))
);