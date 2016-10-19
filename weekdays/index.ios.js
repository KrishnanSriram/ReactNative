/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
var DayItem = require('./src/day-item');
var Moment = require('moment');

import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native'

export default class weekdays extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.textStyle }>Day of the week: </Text>
                {this.days()}
            </View>
        );
    }
    days() {
        var dayItems = [];
        for(i=0;i<7;i++) {
            var day = Moment().add(i, 'days').format('dddd');
            dayItems.push(<DayItem day={day} daysUntil={i}></DayItem>)
        }

        return dayItems;
    }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center', //Align items vertically
       alignItems: 'center',     //Align Items horizontally
       backgroundColor: 'brown',
   },
    textStyle: {
       fontSize: 25,
        margin: 10,
        color: 'white',
    }
});

AppRegistry.registerComponent('weekdays', () => weekdays);