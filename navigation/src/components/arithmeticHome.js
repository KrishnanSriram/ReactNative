/**
 * Created by krishnansriramrama on 10/19/16.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Text,
    Modal,
    View,
} from 'react-native';

export class ArithmeticHome extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            operation: this.props.operation,
            stack: this.props.stack,
            count: this.props.count,
            digits: this.digitToNumber(this.props.digits),
            modalVisible: false,
        };
    }

    render() {
        return (
            <View style={ styles.container } >
                <Text style={ styles.header }>{ this.state.operation }</Text>
                <Text>Stack of numbers: { this.props.stack }</Text>
                <Text>Digits for { this.state.operation } is { this.state.digits } </Text>
                <Text>Count of questions: { this.props.count }</Text>
                <TouchableHighlight style={ styles.button } onPress={ () => this.onPress() }>
                    <Text style={ styles.buttonText }>Start</Text>
                </TouchableHighlight>
            </View>
        );
    }

    /*
    Modal view
     <Modal
     animationType={"slide"}
     transparent={false}
     visible={!this.state.modalVisible}
     onRequestClose={() => {alert("Modal has been closed.")}}
     >
     <View style={{marginTop: 22}}>
     <View>
     <Text>Hello World!</Text>

     <TouchableHighlight onPress={() => {
     this.state = {modalVisible : false}
     }}>
     <Text>Hide Modal</Text>
     </TouchableHighlight>

     </View>
     </View>
     </Modal>
     */

    onCloseModal() {
        this.state = {
            modalVisible: true
        };
        console.log('Visibility: ' + this.state.modalVisible);
    }

    onPress() {
        console.log('Start button pressed!!!' + this.props.digits + ' for ' + this.props.count);
        this.setState({modalVisible: true});
    }


    gotoRoute(name, rowId) {
        if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-1].name != name) {
            this.props.navigator.push({name: name, table:rowId});
        }
    }

    digitToNumber(digitText) {
        var digit = 0;

        var digitTextLower = digitText.toLowerCase();
        console.log(digitText + ' converted to lower: ' + digitTextLower);

        if(digitTextLower == "one digit") {
            digit = 1;
        } else if(digitTextLower == "two digit") {
            digit = 2;
        } else if(digitTextLower == "three digit") {
            digit = 3;
        }

        return digit;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontSize:20,
        fontWeight: 'bold',
    },
    description: {

    },
    button: {
        backgroundColor: 'gray',
        padding: 15,
        margin: 40,
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderRadius: 8,
        height: 40,
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
});

AppRegistry.registerComponent('arithmeticHome', () => ArithmeticHome);
module.exports = ArithmeticHome;