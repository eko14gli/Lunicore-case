import { SET_POST } from '../actions/feed';

const initialState = {
    posts: []
};

const feedReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_POST:
            return {
                posts: action.posts
            };
    }
    return state;
};

export default feedReducer;