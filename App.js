/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import LoginScreen from './containers/LoginScreen';
import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import feedReducer from './store/reducers/feedReducer';
import friendsReducer from './store/reducers/friendsReducer';
import authReducer from './store/reducers/auth';
import imagesReducer from './store/reducers/imagesReducer';
import takePhotoReducer from './store/reducers/takePhotoReducer';
import AppNavigator from './navigation/AppNavigator';
import AuthScreen from './containers/AuthScreen';

const rootReducer = combineReducers({
  feed: feedReducer,
  friends: friendsReducer,
  auth: authReducer,
  images: imagesReducer,
  takePhoto: takePhotoReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}> 
      <AppNavigator />
    </Provider>
  );
};

export default App;
