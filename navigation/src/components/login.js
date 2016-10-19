/**
 * Created by krishnansriramrama on 10/18/16.
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    AppRegistry,
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    AsyncStorage,
    Navigator,
    findNodeHandle,
    Image
} from 'react-native';

var Register = require('./register');

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                email: undefined,
                password: undefined,
                role: 0
            },
            loading: false
        };
    }

    render() {
        let fields = [
            {ref: 'email', placeholder: 'Email', keyboardType: 'email-address', secureTextEntry: false, style: [styles.inputText]},
            {ref: 'password', placeholder: 'Password', keyboardType: 'default', secureTextEntry: true, style: [styles.inputText]},
        ];

        return (
            <ScrollView style={ styles.container } ref={'loginFormC'} {...this.props}>
                <TouchableOpacity activeOpacity={1} style={styles.titleContainer}>
                    <Text style={styles.title}>{'LOGIN'}</Text>
                </TouchableOpacity>
                <View key={'email'} style={styles.inputContainer}>
                    <TextInput {...fields[0]} onFocus={() => this.onFocus({...fields[0]})} onChangeText={(text) => this.state.data.email = text} />
                </View>
                <View key={'password'} style={styles.inputContainer}>
                    <TextInput {...fields[1]} onFocus={() => this.onFocus({...fields[1]})} onChangeText={(text) => this.state.data.password = text} />
                </View>
                <TouchableHighlight style={this.state.loading ? styles.buttonDisabled : styles.button} underlayColor={'#2bbbad'} onPress={() => this.onSubmit()}>
                    <Text style={styles.buttonText}>{this.state.loading ? 'Please Wait . . .' : 'Submit'}</Text>
                </TouchableHighlight>
                <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',margin:8}}>
                    <Text style={{fontSize:17}}>{'Doesn\'t have an account? '}</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.gotoRoute('register')}>
                        <Text style={{fontSize:17,color:'#E65100'}}>{'Register'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    onFocus(argument) {
        setTimeout(() => {
            let scrollResponder = this.refs.loginFormC.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                findNodeHandle(this.refs[argument.ref]), 110, true
            );
        }, 50);
    }

    onSubmit() {
        if (this.state.loading) {
            return;
        }

        let valid = true;

        Object.keys(this.state.data).map((val, key) => {
            if ([null, undefined, 'null', 'undefined', ''].indexOf(this.state.data[val]) > -1) valid = false;
        });

        this.gotoRoute('mathChoices', 'Welcome to Main');

        // if (!valid) return null;
        //
        // this.setState({loading: true});
    }

    goBack() {
        if (this.props.navigator) {
            this.props.navigator.pop();
        }
    }

    gotoRoute(name, title) {
        if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-1].name != name) {
            if(title != null) {
                this.props.navigator.push({name: name, title: title});
            } else {
                this.props.navigator.push({name: name});
            }

        }
    }

    replaceRoute(name) {
        if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-1].name != name) {
            this.props.navigator.replace({name: name});
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
    },
    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 27
    },
    titleContainer: {
        backgroundColor: '#00BFA5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 100
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        justifyContent:'space-around',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#26a69a',
        padding: 15,
        margin: 20,
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderRadius: 8,
        height: 40,
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
    message: {
        color: 'red',
        marginLeft: 5
    },
    buttonDisabled: {
        backgroundColor: '#2bbbad',
        padding: 15,
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    inputText: {
        backgroundColor: '#FFFFFF',
        height: 40,
        marginLeft:20,
        marginRight: 20,
        marginTop: 10,
        marginBottom:10,
        borderWidth:0.4,
        borderRadius:8,
        borderColor: 'gray',
        padding: 10,
    }
});

AppRegistry.registerComponent('login', () => Login);
module.exports = Login;