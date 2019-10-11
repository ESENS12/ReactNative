/**
 *   references https://alligator.io/react/geolocation-react-native/
 *
 *
 * */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

export default class Getting_Location extends Component {
  state = {
    location: 'korea,seoul',
  };

  findCoordinates = () => {
    // Geolocation.getCurrentPosition(info => console.log(info));

    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log('this location : ' + location);
        this.setState({location});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
