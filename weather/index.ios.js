/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    MapView,
    View
} from 'react-native';
var API = require('./src/API');

export default class weather extends Component {
    constructor() {
        super();
        this.state = {
            pin: {
                latitude:42.1418529606525,
                longitude:-87.9684066096521,
            },
            mapRegion: {
                longitudeDelta: 0.10986327587406208,
                latitude: 42.12505111385855,
                longitude: -87.96055509446656,
                latitudeDelta: 0.08797691714462985
            },
            city: '',
            temperature: '',
            description: ''
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <MapView annotations={ [this.state.pin] } region={ this.state.mapRegion } onRegionChangeComplete={ this.onRegionChangeComplete }
                     style={ styles.map }>
                </MapView>
                <View style={ styles.textWrapper }>
                    <Text style={ styles.text }>{ this.state.city }</Text>
                    <Text style={ styles.text }>{ this.state.temperature }</Text>
                    <Text style={ styles.text }>{ this.state.description }</Text>
                </View>
            </View>
        );
    }

    onRegionChangeComplete = (region) => {
        console.log('Region from state change: ');
        console.log(region);
        this.setState({
            pin: {
                latitude: region.latitude,
                longitude: region.longitude
            }
        });

        API(region.latitude, region.longitude)
            .then((data) => {
                this.setState(data);
            })
            .catch(function(err) {
                console.log('ERROR: from API - ' + err);
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    map: {
        flex: 2,
        marginTop: 30,
        // justifyContent:'center',
        // alignItems:'stretch'
    },
    textWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 30
    }
});

AppRegistry.registerComponent('weather', () => weather);