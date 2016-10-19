/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
var formatTime = require('minutes-seconds-milliseconds');

export default class stopwatch extends Component {
  constructor() {
    super();
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: [],
    }; 
  }
  
  render() {
    return (
        <View style={ styles.container }> 
        <View style={ [styles.header] } >
          { this.showTimer() }
          <View style= { [styles.buttonWrapper] }>
            { this.startStopButton() }
            { this.lapButton() }
          </View>
        </View>
        <View style={ [styles.footer] }>
          { this.laps() }
        </View>
      </View>
    );
  }

  showTimer() {
    return (
      <View style={ [styles.timerWrapper] }>
        <Text style={ styles.timer }>{ formatTime(this.state.timeElapsed) }</Text>
      </View>
    )
  }

  startStopButton() {
    var buttonTitle = "Start";
    var buttonBorderStyle = styles.startButton;
    if(this.state.running == true) {
      buttonTitle = "Stop";
      buttonBorderStyle = styles.stopButton;
    } else {
      buttonTitle = "Start";
      buttonBorderStyle = styles.startButton;
    }

    return (
      <View>
        <TouchableHighlight underlayColor="gray" onPress={ () => this.handleStartPress() } 
        style={ [styles.button, buttonBorderStyle] }>
          <Text>{ buttonTitle }</Text>
        </TouchableHighlight>
      </View>
      );
  }

  lapButton() {
    return (
      <View>
        <TouchableHighlight style={ styles.button } underlayColor="gray" 
        onPress={ () => this.handleLapButtonPress() } 
        style={ [styles.button] }>
          <Text>Lap button</Text>
        </TouchableHighlight>
      </View>
    )
  }

  handleStartPress() {
    console.log('Start button pressed');
    if(this.state.running) {
      this.setState({
        running: false
      });
      clearInterval(this.interval);

      return;
    }
    this.setState({
      startTime: new Date()
    });
    
    this.interval = setInterval(()=> {
      console.log(this.state.timeElapsed);
      this.setState( {
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 100)
  }

  handleLapButtonPress() {
    var lapTime = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lapTime])
    })
  }

  lapList() {
    return(<View>
      <Text>{ this.laps() }</Text>
    </View>);
  }

  laps() {
    console.log('Laps list button tapped');
    console.log(this.state.laps);

    return this.state.laps.map(function(lapTime, index) {
      return (<View style={ styles.lap }>
        <Text style={ styles.lapText }>
          Lap #{ index + 1 }
        </Text>
        <Text style={ styles.lapText }>
          { formatTime(lapTime) }
        </Text>
      </View>);
    });
  }

  border(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    // justifyContent: 'center',
    alignItems: 'stretch',
    // backgroundColor: '#F5FCFF',
  },
  header: { // Yellow
    flex: 1
  },
  footer: { // Blue
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderColor: '#00CC00',
  },
  stopButton: {
    borderColor: '#CC0000'
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
  timer: {
    fontSize: 60,
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
