import React, { useReducer, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator, Image} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import img from '../assets/images/logo.png';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          username: '',
          password: ''
        },
        inputValidities: {
            username: false,
            password: false
        },
        formIsValid: false
      });

    const signinHandler = async () => {
        action = authActions.signin(
            formState.inputValues.username, 
            formState.inputValues.password
        );
        setIsLoading(true);
        try {
            await dispatch(action);
            setIsLoading(false);
            props.navigation.navigate('Friends');
        } catch(err) {
            console.log(err);
        }
    };



    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );

    return (
    <KeyboardAvoidingView 
    behavior='padding' 
    style={styles.screen}
    keyboardVerticalOffset={50}
    >
      <Image source={img} style={styles.logo} />
        <Card style={styles.authContainer}>
            <ScrollView>
                <Input 
                id='username' 
                label='Username'
                keyboardType='email-address'
                required
                autoCapitalize='none'
                errorText='Please enter a valid username'
                onInputChange={inputChangeHandler}
                initialValue=""
                />

                <Input 
                id='password' 
                label='Password'
                keyboardType='default'
                secureTextEntry
                required
                minLength={5}
                autoCapitalize='none'
                errorText='Please enter a valid password'
                onInputChange={inputChangeHandler}
                initialValue=""
                />
            </ScrollView>
            {isLoading ?(
                 <ActivityIndicator size='small' />
                ) : ( 
            <Button title='Login' onPress={signinHandler} />)}
        </Card>
    </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    logo: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    }
});

export default AuthScreen;