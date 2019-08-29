import React, {Component, useEffect} from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation';
import FeedScreen from '../containers/FeedScreen';
import FriendsScreen from '../containers/FriendsScreen';
import { StyleSheet, View, SafeAreaView, ScrollView, Dimensions, Image, Button, TextInput} from 'react-native';
import AuthScreen from '../containers/AuthScreen';
import takePhotoAction from '../store/actions/takePhoto';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import img from '../assets/images/user.png';
import ImagePicker from 'react-native-image-picker';

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



class CustomDrawerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath:{},
            text: 'Gustav Lilja',
            editableText: false
        };
    }

    onPressEdit = () => {
        this.setState({ editableText: true})
    };

    chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        const styles = StyleSheet.create({  
            container: {  
              flex: 1,  
              justifyContent: 'center',  
          },  
            headerText: {  
              fontSize: 20,  
              textAlign: "center",  
              margin: 10,  
              fontWeight: "bold"  
          },  
          TextInputStyle: {  
              textAlign: 'center',  
              height: 40,  
              borderRadius: 10,  
              borderWidth: 2,  
              borderColor: '#009688',  
              marginBottom: 10  
          }  
          });

        ImagePicker.showImagePicker(options, response => {
            //console.log('Response = ', response);
       
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              let source = response;
              this.setState({
                filePath: source
              });
              console.log(this.state.filePath.uri);
            }
          });
        };

    render () {
    return(
    <SafeAreaView style={{flex:1}}>
        <Container>
            <Header style={{height:200}}>
            <Body>
                <Image
                    style={{width: 120, height: 120, borderRadius: 60, backgroundColor: 'white'}}
                    defaultSource={img}
                    source={{uri:this.state.filePath.uri}}
                    
                    //source={img}
                 />
                 <TextInput 
                    editable = {this.state.editableText}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                 />
            </Body>
            </Header>
            <Content>
                <Button title="Change avatar" onPress={this.chooseFile.bind(this)} ></Button>
                <Button 
                    title="Edit user info" 
                    onPress={this.onPressEdit.bind(this)}
                    color='#841584'
                     />
            </Content>
        </Container>
    </SafeAreaView>
    );
}
};

const takeImageHandler = () => {
    ImagePicker.launchCamera(options, (response) => {
        
    });
};

const FeedNavigator = createStackNavigator({
    Feeds: FeedScreen      
});

const FriendsNavigator = createStackNavigator({
    Friends: FriendsScreen
});

const TabNavigator = createBottomTabNavigator({
    Friend: FriendsNavigator,
    Feed: FeedNavigator
});

const DrawerNavigator = createDrawerNavigator({
    Tab: TabNavigator    
},
    {
        contentComponent: CustomDrawerComponent
    }
);

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Drawer: DrawerNavigator

});

export default createAppContainer(MainNavigator);
