import Post from '../../models/post';


export const SET_POST = 'SET_POST';


export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const myHeader = new Headers();
        myHeader.append('Authorization', token);
        const response = await fetch(
            'https://lunicase-social-circle.herokuapp.com/getFeed',
            {
                method: 'GET',
                headers: {Authorization: 'Bearer ' + token}, 
            }
        );
        const resData = await response.json();
        console.log(resData);
        const loadedPosts = [];

        const resDataList = resData.feed;
        for(let i = 0; i<resDataList.length; i++) {
            loadedPosts.push(
                new Post(
                    resDataList[i].user_id,
                    resDataList[i].text_content,
                    resDataList[i].time
                )
            );
        }
        dispatch({type: SET_POST, posts: loadedPosts});        
    };
};