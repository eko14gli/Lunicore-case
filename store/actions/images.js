import Picture from '../../models/picture';

export const SET_IMAGES = 'SET_IMAGES';
export const SET_ALL_IMAGES = 'SET_ALL_IMAGES';

export const fetchImages = (id) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const myHeader = new Headers();
        myHeader.append('Authorization', token);
        console.log(token);
        const response = await fetch(
            'https://lunicase-social-circle.herokuapp.com/getImg/' +id, 
            {
                method: 'GET',
                headers: {Authorization: 'Bearer ' + token}, 
            }
        );
        const resData = await response.blob();
        const imgURL = URL.createObjectURL(resData);
        const loadedImages = [imgURL];
        //console.log(resData._data.name);
        dispatch({type: SET_IMAGES, images: loadedImages});        
    };
};

export const fetchAllImages = () => {
    return async(dispatch, getState) => {
        const token = getState().auth.token;
        const myHeader = new Headers();
        myHeader.append('Authorization', token);
        let promiseArray = [];
        let baseURL = 'https://lunicase-social-circle.herokuapp.com/getImg/';
        for(let i=0; i<5; i++) {
            promiseArray.push(
                await fetch(
                    baseURL +i,
                    {
                        method: 'GET',
                        headers: {Authorization: 'Bearer ' + token},
                    }
                ).then(function(response) {
                    return response.blob();
                })
            );
        }
        console.log(promiseArray);
        loadedAllPictures = [];
        for(let i=0; i<promiseArray.length; i++) {
            const imgURI = URL.createObjectURL(promiseArray[i]);
            loadedAllPictures.push(
                imgURI
            );
        }
        dispatch({type: SET_ALL_IMAGES, images: loadedAllPictures});
        return Promise.all(promiseArray);
    }
}