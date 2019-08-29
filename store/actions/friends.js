import User from '../../models/user';

export const SET_FRIENDS = 'SET_FRIENDS';


export const fetchFriends = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const myHeader = new Headers();
        myHeader.append('Authorization', token);
        console.log(token);
        const response = await fetch(
            'https://lunicase-social-circle.herokuapp.com/getFriends', 
            {
                method: 'GET',
                headers: {Authorization: 'Bearer ' + token}, 
            }
        );
        const resData = await response.json();
        const loadedFriends = [];
        const resDataList = resData.users;
        for(let i = 0; i<resDataList.length; i++) {
            loadedFriends.push(
                new User(
                    resDataList[i].id,
                    resDataList[i].first_name,
                    resDataList[i].surname,
                    resDataList[i].age
                )
            );
        }
        console.log(loadedFriends);
        dispatch({type: SET_FRIENDS, friends: loadedFriends});        
    };
};
