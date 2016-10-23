/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
// var EventSegmentedControl = require('./src/components/EventSegmentedControl');
import EventSegmentedControl from './src/components/EventSegmentedControl';
import AboutModal from './src/components/AboutModal';
import NavigationModal from './src/components/NavigationModal';

import {
    AppRegistry,
    StyleSheet,
    Text,
    Modal,
    TouchableHighlight,
    View,
} from 'react-native';
// import EventSegmentedControl from './src/components/EventSegmentedControl';

export default class modal extends Component {

    componentWillMount() {
        this.state = {
            selectedIndex: -1,
            segmentLabels: ['About', 'NC Modal', 'Three'],
            modalVisible: false,
            navigationModalVisible: false,
        }
    }

    render() {
        return (
            <View style={{marginTop:30}}>
                <Text>Times have changed!!!</Text>
                <EventSegmentedControl segmentLabels = { this.state.segmentLabels }
                                       onChangeIndex= {(index) => this.segmentSelectedIndexChanged(index) }>
                </EventSegmentedControl>
                <AboutModal modalVisible={ this.state.modalVisible } onPressClose= { () => this.onPressModalClose() }/>
                <NavigationModal navigationModalVisible={ this.state.navigationModalVisible } onPressClose= { () => this.onPressModalClose() }/>
            </View>
        );
    }

    segmentSelectedIndexChanged(index) {
        console.log('Index is: ' + index);
        if(index == 0) {
            this.setState({
                modalVisible: true
            });
            console.log('Visibility for modal: ' + this.state.modalVisible);
        } else {
            this.setState({
                navigationModalVisible: true
            });
            console.log('Visibility for modal: ' + this.state.navigationModalVisible);
        }
    }

    onPressModalClose() {
        console.log('index.ios - onPressModalClose invoked');
        this.setState({
            modalVisible: false,
            navigationModalVisible: false,
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        margin: 20,
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
});

AppRegistry.registerComponent('modal', () => modal);
