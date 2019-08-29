import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ActivityIndicator} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import UserItem from '../components/UserItem';
import * as postAction from '../store/actions/feed';
import * as imagesAction from '../store/actions/images';
import { useDispatch } from 'react-redux';
import image from '../assets/images/user.png';
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


const FeedScreen = props => {
    const dispatch = useDispatch();
    const availablePosts = useSelector(state => state.feed.posts);
    const availableFriends = useSelector(state => state.friends.users);
    const availableImages = useSelector(state => state.images.images);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            await dispatch(postAction.fetchPosts());
            setIsLoading(false);
        };
        loadPosts();
    }, [dispatch]);

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

    if(!isLoading && availablePosts.length === 0) {
        return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No posts available</Text>
    </View>
    );
}
    
return(
    <List>
        <FlatList 
            data={availablePosts}
            keyExtractor={item => item.time.toString()}
            renderItem={itemData => (
                <ListItem avatar>
                    <Left>
                        <Thumbnail small source={{uri: availableImages[itemData.item.user_id]}}></Thumbnail>
                    </Left>
                <Body>
                    <Text>
                    {availableFriends[itemData.item.user_id].first_name} {availableFriends[itemData.item.user_id].surname}
                    </Text>
                    <Text note>{itemData.item.text_content}</Text>
                </Body>
                <Right>
                    <Text note>{itemData.item.time}</Text>
                </Right>
                </ListItem> 
            )}
        />
    </List>
    );
};

FeedScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Feed',
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

export default FeedScreen;