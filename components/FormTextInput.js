import React, {Component} from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import colors from '../config/colors';

/*const FormTextInput = (props) => {
    return (
    <TextInput
        selectionColor={colors.DODGER_BLUE}>
        style={styles.textInput}
    </TextInput>
    );
};*/

class FormTextInput extends Component {
    constructor(props) {
        super(props);
    }

    textInputRef = React.createRef();

    focus = () => {
        if (this.textInputRef.current) {
            this.textInputRef.current.focus();
        }
    };

    render() {
        return (
            <TextInput
                ref={this.textInputRef}
                selectionColor={colors.DODGER_BLUE}
                style={styles.textInput}
                onChangeText={this.props.onChangeText}>
            </TextInput>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: colors.SILVER,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    }
});

export default FormTextInput;