import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ActivityIndicator} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import UserItem from '../components/UserItem';
import * as friendsAction from '../store/actions/friends';
import * as imagesAction from '../store/actions/images';
import { useDispatch } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Icon,
    List,
    ListItem,
    Text,
    Thumbnail,
    Left,
    Right,
    Body
  } from "native-base";


const FriendsScreen = props => {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends.users);
    const availableImages = useSelector(state => state.images.images);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadFriends = async () => {
            setIsLoading(true);
            await dispatch(friendsAction.fetchFriends());
            setIsLoading(false);
        };
        loadFriends();
    }, [dispatch]);

    /*useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            await dispatch(imagesAction.fetchImages("1"));
            setIsLoading(false);
        };
        loadImages();
    }, [dispatch]);*/

    useEffect(() => {
        const loadAllImages = async () => {
            setIsLoading(true);
            await dispatch(imagesAction.fetchAllImages());
            setIsLoading(false);
        };
        loadAllImages();
    }, [dispatch]);

    if (isLoading) {
        return (
         <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large'/>
        </View>
        );
    }

  
      


    if(!isLoading && friends.length === 0) {
        return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No friends available</Text>
    </View>
    );
}

   return(
            <List>
                <FlatList 
                    data={friends}
                    keyExtractor={item => item.id.toString()}
                    renderItem={itemData => (
                        <ListItem avatar>
                        <Left>
                            <Thumbnail small source={{uri: availableImages[itemData.item.id]}}></Thumbnail>
                        </Left>
                        <Body>
                            <Text>{itemData.item.first_name} {itemData.item.surname}</Text>
                        </Body>
                        </ListItem> 
                    )}
                />
            </List>
            );
};




FriendsScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Friends',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default FriendsScreen;