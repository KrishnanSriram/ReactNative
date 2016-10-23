/**
 * Created by krishnansriramrama on 10/21/16.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableHighlight,
} from 'react-native'

class AboutModal extends Component {

    constructor() {
        super();
        console.log('AboutModal: constructor');
        this.onCloseButtonPressed.bind(this);
    }

    componentWillMount() {
        this.setState({
            modalVisible: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState( {
            modalVisible: nextProps.modalVisible,
        });
    }

    render() {
        return (
            <Modal
                style = { styles.container }
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}>
                <View style={ styles.modalView }>
                    <View style={{ margin: 20, flex: 0.9 }}>
                        <Text style = { styles.welcome }>About Modal</Text>
                        <Text style={ styles.instructions }>{ this.someTextForDisplay() }</Text>
                    </View>
                    <View style={ { flex: 0.1, margin: 20 }}>
                        <TouchableHighlight underlayColor='#808080' style = { styles.button } onPress={() => {
                            this.onCloseButtonPressed();
                        }}>
                            <Text style={ styles.buttonText }>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }

    onCloseButtonPressed() {
        console.log('AboutModal: ')
        this.props.onPressClose();
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

    someTextForDisplay() {
        return "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.";
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

AppRegistry.registerComponent('AboutModal', () => AboutModal);
module.exports = AboutModal;