/**
 * Created by krishnansriramrama on 10/22/16.
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native'

export class LastView extends Component{
    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            navigator : this.props.navigator,
            nextHandler: this.props.nextHandler,
        }
    }

    render() {
        return(
            <View style={ styles.container} >
                <Text>This is Last view!!!</Text>
                <TouchableHighlight style={ styles.button } onPress={ () => this.onNavigateToNextView()}>
                    <Text>Next</Text>
                </TouchableHighlight>
            </View>
        )
    }

    onNavigateToNextView() {
        this.state.nextHandler();
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        marginTop: 65,
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

AppRegistry.registerComponent('LastView', () => LastView);

module.exports = LastView;