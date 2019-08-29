import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

/*const Button = (props) => {
    return(
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Text style={styles.text}>Log In</Text>
    </TouchableOpacity>
    );
};*/

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Text style={styles.text}>Log In</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.DODGER_BLUE,
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255,255,255,0.7)'
    },
    text: {
        color: colors.WHITE,
        textAlign: 'center',
        height: 20
    }
});

export default Button;