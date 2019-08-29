
  import ImagePicker from 'react-native-image-picker';

  export const TAKE_PHOTO = 'TAKE_PHOTO';

  export const handleChoosePhoto = () => {
      return async (dispatch) => {
        const options = {};
        ImagePicker.launchImageLibrary(options, response => {
            console.log('response: ', response );
            if(response.uri) {
                photoURI = response.uri;
            }
        });
        console.log(photoURI);
        dispatch({type: TAKE_PHOTO, takePhoto: photoURI}); 
      };
};

