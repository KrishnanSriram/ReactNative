/**
 * Created by krishnansriramrama on 10/16/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
Text
} from 'react-native';

export class Button extends Component {
    constructor() {
        super();
    }

    render() {
        return(
                <TouchableHighlight style = { styles.button } underlayColor={'gray'} onPress={ this.props.onPressButton }>
                <Text style = { styles.buttonText }>{ this.props.text }</Text>
            </TouchableHighlight>
        )
    }

    onPressThisButton() {
        console.log('Button: pressed');
        // this.props.onPressButton();
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: 'black',
        margin: 10,
        height: 30,
    },
    buttonText: {
        flex: 1,
        alignSelf:'center',
        fontSize: 16,
    }

});
module.exports = Button;