/**
 * Created by krishnansriramrama on 10/22/16.
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native'

export class RootView extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            navigator: this.props.navigator,
        }
    }

    render() {
        console.log('RootView - render');
        return(
            <View style={ styles.container} >
                <Text style={ styles.welcome }>Begin you navigation into a simple modal based navigation controller from here</Text>
                <TouchableHighlight style={ styles.button } onPress={ () => this.onStartNavigation()}>
                    <Text>Start</Text>
                </TouchableHighlight>
            </View>
        )
    }

    onStartNavigation() {
        console.log('RootView: Start navigation!!!');
        this.state.navigator.push({ title: 'First View', index: 1, name: 'first' });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 65,
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
    button: {
        margin: 10,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#C0C0C0',
        height: 35,
        alignItems: 'center'
    },
});

AppRegistry.registerComponent('RootView', () => RootView);

module.exports = RootView;