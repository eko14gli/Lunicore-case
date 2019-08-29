import { SIGNIN } from '../actions/auth';

const initialState = {
    token: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            return {
                token: action.token
            };
        default:
            return state;
    }
};