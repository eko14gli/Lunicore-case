import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import FeedScreen from '../containers/FeedScreen';
import FriendsScreen from '../containers/FriendsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import menu from '../assets/images/menu.png';
import {image} from 'react-native';

const SocialStack = createStackNavigator({
    Feed: FeedScreen,
    Friends: FriendsScreen
},
{
    navigationOptions:() => ({
        headerLeft:<Text>Menu</Text>
    })
}

)

const DrawerContanier = createDrawerNavigator({
    Feed: FeedScreen
},
{
    initialRouteName: 'Feed'
}
)

export default DrawerContanier;