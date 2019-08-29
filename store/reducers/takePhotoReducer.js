import { TAKE_PHOTO } from '../actions/takePhoto';

const initialState = {
    takePhoto: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TAKE_PHOTO: 
            return {
                takePhoto: action.takePhoto
            };
        
    }
    console.log(state);
    return state;
};


