/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';

var Main = require('./src/components/main');
var Register = require('./src/components/register');
var Login = require('./src/components/login');
var MathTable = require('./src/components/mathTables');
var MathChoices = require('./src/components/mathChoices');

export default class navigation extends Component {
    render() {
        return (<Navigator style={ styles.navigationContainer } initialRoute={{name: 'login'}}
                   renderScene={ (route, navigator) => this.renderScene(route, navigator) }
                           navigationBar={ this.navigationBar() }>
        </Navigator>);
    }

    navigationBar() {
        return (
            <Navigator.NavigationBar routeMapper={{
                LeftButton: (route, navigator, index, navState) =>
                { return this.barButton(route, navigator, index, navState,'Back') },
                RightButton: (route, navigator, index, navState) =>
                { return this.barButton(route, navigator, index, navState,'Exit') },
                Title: (route, navigator, index, navState) =>
                { return (<Text style={ styles.title }>{ this.barTitleFor(route) }</Text>); },
            }}
                                     style={ styles.navigationBar } />
        );
    }

    barTitleFor(route) {
        var barTitle = '';
        if(route.name === 'main') {
            barTitle = 'MAIN';
        } else if (route.name === 'register') {
            barTitle = 'Register to Logon'
        } else if (route.name === 'login') {
            barTitle = 'Login and proceed!!!';
        } else if(route.name === 'mathTable') {
            barTitle = 'Math tables';
        } else if(route.name === 'mathChoices') {
            barTitle = 'Pick up a choice';
        }

        return barTitle;
    }

    barButton(route, navigator, index, navState, text) {
        if(route.name === 'login') {
            return;
        }

        if(route.name === 'mathChoices' && text ==='Back') {
            return;
        }

        return (<TouchableOpacity style={ styles.navBarButton }
                                  onPress = { () => this.onBarButtonPress(route, navigator, index, text)} >
            <View>
                <Text style={ styles.navBarButtonText }>{text}</Text>
            </View>
        </TouchableOpacity>);
    }

    onBarButtonPress(route, navigator, index, text) {
        console.log('Bar button pressed: ' + text);
        if(text === "Back") {
            this.onBackButtonPressed(route, navigator, index);
        } else if(text === "Exit") {
            this.onExitPressed(route, navigator, index);
        }
    }

    onBackButtonPressed(route, navigator, index) {
        navigator.pop();
    }

    onExitPressed(route, navigator, index) {
        console.log('Exit to root');
        navigator.popToTop();
    }

    renderScene(route, navigator) {1
        console.log('Navigator object: ' + navigator);
        if(route.name === 'main') {
            return (<Main navigator={ navigator }></Main>);
        } else if(route.name === 'login') {
            return (<Login navigator={ navigator }></Login>)
        } else if(route.name === 'register') {
            return (<Register navigator={ navigator }></Register>)
        } else if(route.name === 'mathTable') {
            return (<MathTable navigator={ navigator } table={ route.table }></MathTable>);
        } else if(route.name === 'mathChoices') {
            return (<MathChoices navigator={ navigator } ></MathChoices>);
        }

    }
}

const styles = StyleSheet.create({
    navigationContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    navBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 10,
    },
    barButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        padding: 5,
        margin: 10,
        height: 25,
        tintColor: '#0076FF'
    },
    navigationBar: {
        backgroundColor: 'white',
        borderWidth: 1.0,
        borderColor: 'gray',
    },
    navBarButtonText: {
        fontSize:17,
        letterSpacing: 0.5,
        color: '#333',
        fontWeight:'500',
    },
    title: {
        justifyContent: 'center',
        margin: 10,
        letterSpacing: 0.5,
        color: 'black',
        fontWeight: 'bold',
    }
});

AppRegistry.registerComponent('navigation', () => navigation);
