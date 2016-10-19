/**
 * Created by krishnansriramrama on 10/15/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Navigator,
    StatusBar,
} from 'react-native';
var SignIn = require('./components/authentication/signin');
var ROUTES = {
    signin: SignIn
};

export default class Main extends Component {

    constructor() {
        super();
    }


    render() {
        return (
            <Navigator style={ styles.navigatorContainer }
                initialRoute={{ title: 'My Initial Scene', name: 'signin' }}
                renderScene={(route, navigator) => {
                    return this.renderScene(route, navigator);
                }}
            />
        );
    }

    renderScene(route, navigator) {
        switch(route.name) {
            case 'sigin':
                return (<SignIn navigator={ navigator } title={ 'SignIn - My Application' }/>);
            default:
                return (<SignIn navigator={ navigator } title={ 'SignIn - Default Application' }/>);
        }

    }
}

const styles = StyleSheet.create({
    navigatorContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
});

module.exports = Main;