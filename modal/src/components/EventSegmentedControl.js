/**
 * Created by krishnansriramrama on 10/21/16.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    SegmentedControlIOS,
} from 'react-native'

class EventSegmentedControl extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            values: this.props.segmentLabels,
            value: 'Not selected',
            selectedIndex: undefined
        };
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text>Event</Text>
                <Text style={styles.text} >
                    Value: {this.state.value}
                </Text>
                <Text style={styles.text} >
                    Index: {this.state.selectedIndex}
                </Text>
                <SegmentedControlIOS
                    values={this.state.values}
                    selectedIndex={this.state.selectedIndex}
                    onChange={ (event) => this.onChange(event) }
                    onValueChange={ (value) => this.onValueChange(value) } />
            </View>
        );
    }

    onChange(event) {
        this.setState({
            selectedIndex: event.nativeEvent.selectedSegmentIndex,
        });
        this.props.onChangeIndex(event.nativeEvent.selectedSegmentIndex);
    }

    onValueChange(value) {
        this.setState({
            value: value,
        });
    }


    onSegmentIndexChanged(event) {
        this.setState({
            selectedIndex: event.nativeEvent.selectedSegmentIndex,
        });
        console.log('Selected index: ' + this.state.selectedIndex);
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
    text: {
        fontSize: 15,
    }
});

AppRegistry.registerComponent('EventSegmentedControl', () => EventSegmentedControl);
module.exports = EventSegmentedControl;