/**
 * Created by krishnansriramrama on 10/21/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Modal,
    View,
} from 'react-native';
import NavigationController from './NavigationController';

export class NavigationModal extends Component {
    constructor() {
        super();
        this.onCloseButtonPressed.bind(this);
    }

    componentWillMount() {
        this.setState({
            navigationModalVisible: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('NavigationModal: componentWillReceiveProps - ' + nextProps.navigationModalVisible);
        this.setState( {
            navigationModalVisible: nextProps.navigationModalVisible,
            onPressClose: nextProps.onPressClose,
        });
    }

    render() {
        return (
            <Modal
                style = { styles.container }
                animationType={"slide"}
                transparent={false}
                visible={ this.state.navigationModalVisible }
                onRequestClose={() => {alert("Modal has been closed.")}}>
                    <View style={ styles.modalView }>
                        <NavigationController onLeftBarButtonPressed = { () => this.onCloseButtonPressed() }
                                     onRightBarButtonPressed = { () => this.onCloseButtonPressed() } />
                    </View>
            </Modal>
        );
    }

    onCloseButtonPressed() {
        console.log('NavigationModal: onCloseButtonPressed ');
        console.log(this.props.onPressClose());
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
    },
    modalView: {
        flex: 1,
        margin: 35,
        marginTop: 65,
        borderWidth:1,
        borderColor: 'black',
    },
});

AppRegistry.registerComponent('NavigationModal', () => NavigationModal);
module.exports = NavigationModal;