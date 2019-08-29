import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

const CustomHeaderButton = props => {
    return ( 
        <HeaderButton 
            {...props} 
            IconComponent={Ionicons} 
            iconSize={23} 
            color={Platform.OS === 'android' ? 'white' : colors.BLACK}
        />
    );
};

export default CustomHeaderButton;