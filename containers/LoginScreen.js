import React, {Component} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import imageLogo from '../assets/images/logo.png';
import colors from '../config/colors';
import strings from '../config/strings';
import {KeyboardAvoidingView} from 'react-native';
import { AsyncStorage } from 'react-native';

const State = {
    email: "",
    password: "",
    loading: false
};


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.handleEmailChange.bind(this);
        this.handlePasswordChange.bind(this);
        this.handleEmailChange.bind(this);
        this.handleEmailSubmitpress.bind(this);
    }

    state = {
        email: "",
        password: "",
        token: null,
        authorization: false
    };

    

    handleEmailChange = (email) => {
        this.setState({ email: email});
        console.log(email);
    };

    handlePasswordChange = (password) => {
        this.setState({ password: password});
    };

    handleEmailSubmitpress = () => {
        if(this.passwordInputRef.current) {
            this.passwordInputRef.current.focus();
        }
    };

    handleLoginPress = () => {
        fetch('https://lunicase-social-circle.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "username=luniuser&password=lunicase",
        }).then((response) => response.json())
            .then((responseJson) => {
                //const token = responseJson.token
                //AsyncStorage.setItem('token', token);
                this.setState({ token: responseJson.token});
                this.setState({ authorization: responseJson.auth});
                this._signInAsync();   
            })
            .catch((error) => {
                console.log(error);
            });
        
    };

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', this.state.token);
        this.props.navigation.navigate('Drawer');
    };

    render() {
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image source={imageLogo} style={styles.logo} />
                <View style={styles.form}>
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        placeholder={strings.EMAIL_PLACEHOLDER}
                        onSubmitEditing={this.handleEmailSubmitpress}
                        autoCorrect={false}
                        //keyboardType='email-address'
                        returnKeyType='next'    
                    />
                    <FormTextInput
                        ref={this.passwordInputRef}
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        placeholder={strings.PASSWORD_PLACEHOLDER}
                        secureTextEntry={true}
                        returnKeyType="done"
                     />
                     <Button label={strings.LOGIN} onPress={this.handleLoginPress} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        width: '80%'
    }
});

export default LoginScreen;

