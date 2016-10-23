/**
 * Created by krishnansriramrama on 10/22/16.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Navigator,
    TouchableHighlight,
} from 'react-native';

import RootView from './RootView';
import FirstView from './FirstView';
import SecondView from './SecondView';
import LastView from './LastView';
import ErrorView from './ErrorView';

export class NavigationController extends Component {
    render() {
        return(<Navigator
            initialRoute={{ title: 'Awesome Scene', index: 0, name: 'root' }}
            renderScene={(route, navigator) =>
                this.renderScenes(route, navigator)
            }
            style={{padding: 10}}
            navigationBar={
                this.navigationBar()
            }
        />);
    }
    navigationBar() {
        return(<Navigator.NavigationBar
            routeMapper={{
                LeftButton: (route, navigator, index, navState) =>
                { return this.leftBarButton(route, navigator, index, navState) },
                RightButton: (route, navigator, index, navState) =>
                { return this.rightBarButton(route, navigator, index, navState) },
                Title: (route, navigator, index, navState) =>
                { return (<Text>{route.title}</Text>); },
            }}
            style={{backgroundColor: 'gray'}}
        />);
    }

    leftButtonPressed() {
        this.props.onLeftBarButtonPressed();
    }

    rightButtonPressed() {
        this.props.onRightBarButtonPressed();
    }

    leftBarButton(route, navigator, index, navState) {
        return (
            <TouchableHighlight style={ styles.barButton } onPress={() => this.leftButtonPressed() }>
                <Text>Cancel</Text>
            </TouchableHighlight>);
    }

    rightBarButton(route, navigator, index, navState) {
        return (
            <TouchableHighlight style={ styles.barButton } onPress={() => this.leftButtonPressed() }>
                <Text>Done</Text>
            </TouchableHighlight>);
    }

    rootView(navigator) {
        return (<RootView navigator={ navigator }/>)
    }

    firstView(navigator) {
        return (<FirstView navigator={ navigator }/>)
    }

    secondView(navigator) {
        return <SecondView navigator= { navigator }/>
    }

    lastView(navigator) {
        return <LastView navigator= { navigator } nextHandler = { () => this.onCloseButtonPressed() }/>
    }

    renderScenes(route, navigator) {
        console.log('Name of the route: ' + route.name);
        if(route.name === 'root') {
            return this.rootView(navigator);
        } else if(route.name === 'first') {
            return this.firstView(navigator);
        } else if(route.name === 'second') {
            return this.secondView(navigator);
        } else if (route.name === 'last') {
            return this.lastView(navigator);
        }
        // This should be error View
        return(<View style={ { flex: 0.1, margin: 50 }}>
            <TouchableHighlight underlayColor='#808080' style = { styles.button } onPress={() => {
                route.name = 'first';
                navigator.push('first')
            }}>
                <Text style={ styles.buttonText }>Dismiss Modal</Text>
            </TouchableHighlight>
        </View>);
    }

    // Nagiator methods - Ends
}

const styles = StyleSheet.create({
    barButton: {
        margin: 5,
        justifyContent: 'center',
        backgroundColor: '#C0C0C0',
        height: 30,
        padding: 5,
        borderRadius: 8,
    },
    button: {
        margin: 10,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#C0C0C0',
        height: 35,
    },
    buttonText: {
        justifyContent: 'center',
        fontSize: 15,
        textAlign: 'center',
    }
});

AppRegistry.registerComponent('NavigationController', () => NavigationController);
module.exports = NavigationController;