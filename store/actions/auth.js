export const SIGNIN = 'SIGNIN'

export const signin = (username, password) => {
    return async dispatch => {
        const response = await fetch('https://lunicase-social-circle.herokuapp.com/login',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: 'username=luniuser&password=lunicase'
        }
    ).catch((error) => {
        console.log(error);
    });

        if (!response.ok) {
            const errorResData = await response.json();
            console.log(errorResData);
        }

        const resData = await response.json();
        console.log(resData.token);

        dispatch({type: SIGNIN, token: resData.token});
    };
};