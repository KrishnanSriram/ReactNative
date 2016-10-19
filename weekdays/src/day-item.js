import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native'

class DayItem extends Component {
    render() {
        return (
            <Text style={this.style()} >
                {this.props.day}
            </Text>
        );
    }
    style() {
        return {
            color:this.color(),
            fontWeight: this.fontWeight(),
            fontSize: this.fontSize(),
            lineHeight: this.lineHeight()
        }
    }

    color() {
        var opacity = 1/this.props.daysUntil;

        return 'rgba(0,0,0,' + opacity + ')';
    }

    fontWeight() {
        var weight = 7 - this.props.daysUntil;
        return (weight * 100).toString();
    }

    fontSize() {
        return 60 - (6 * this.props.daysUntil);
    }

    lineHeight() {
        return 70 - (4 * this.props.daysUntil);
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
       fontSize: 15,
        margin: 10,
        color: 'white',
    }
});

module.exports = DayItem;