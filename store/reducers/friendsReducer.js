import { SET_FRIENDS } from '../actions/friends';
import USERS from '../../data/dummy-user-data';

const initialState = {
    users: USERS
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_FRIENDS:
            console.log(action.friends);
            return {
                users: action.friends
            };
        }
        console.log(state);
        return state;
};