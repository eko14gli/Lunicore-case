import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet} from 'react-native';
import Card from './UI/Card';


const UserItem = props => {
    return (
        <View>
            <Text>{props.id}</Text>
            <Text>{props.first_name}</Text>
            <Text>{props.surname}</Text>
            <Text>{props.age}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    user: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 100,
        width: 400,
        margin: 20
    },
    image: {
        width: '100%',
        height: '60%'
    }
});

export default UserItem;