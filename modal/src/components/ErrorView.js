/**
 * Created by krishnansriramrama on 10/22/16.
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native'

export class ErrorView extends Component{
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return(
            <View style={ styles.container} >

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
    }
});

AppRegistry.registerComponent('ErrorView', () => ErrorView);

module.exports = ErrorView;