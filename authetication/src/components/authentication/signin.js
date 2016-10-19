/**
 * Created by krishnansriramrama on 10/15/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    AppRegistry
} from 'react-native';
var Button = require('./../common/button');

export class SignIn extends Component {
    constructor() {
        super();
    }

    render() {
        console.log('SignIn: render');
        return(
            <View style = { styles.container }>
                <Text style={ styles.header }>SignIn</Text>
                <TextInput style={ styles.input } placeholder='EMail Id'></TextInput>
                <TextInput secureTextEntry={true} style={ styles.input } placeholder='Password'></TextInput>
                <View style={ styles.buttonsView } >
                    <Button text="Log In" onPressButton={ this.onPressButton }/>
                    <Button text="Register" onPressButton={ this.onPressButton }/>
                </View>
            </View>
        )
    }

    onPressButton() {
        console.log('Tapped button');
    }
}

const styles = StyleSheet.create({
    container: {
        flex :1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 4,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        width: 200,
        alignSelf: 'center'
    },
    header: {
        fontSize:26,
        textAlign:'left',
        margin:20,
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center'
    }
});

module.exports = SignIn;

// AppRegistry.registerComponent('SignIn', () => SignIn);