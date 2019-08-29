import { SET_IMAGES, SET_ALL_IMAGES } from '../actions/images';


const initialState = {
    images: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_IMAGES:
            console.log(action.images);
            return {
                images: action.images
            };
        case SET_ALL_IMAGES:
            console.log(action.images);
            return {
                images: action.images
            }
        }
        console.log(state);
        return state;
};