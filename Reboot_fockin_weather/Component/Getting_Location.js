/**
 *   references https://alligator.io/react/geolocation-react-native/
 *
 *
 * */

import React, {Component} from 'react';
// import GetWeather from '/Component/GetWeather.js'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const API_KEY = ''

export default class Getting_Location extends Component {

  //this is sample code
  state = {
    location: 'korea,seoul',
  };

  //
  // getWeather = async (latitude, longitude) => {
  //   const{ data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);
  //   Alert.alert(data);
  // };

  getWeather = async (latitude, longitude) => {
    try{
      console.log("getWeather lat : " + latitude + ", lon : " + longitude);
      return await axios.get(`http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);
    }catch (e) {
      Alert.alert('Error!' + e.toString());
    }
  };




  findCoordinates = async() => {
    // Geolocation.getCurrentPosition(info => console.log(info));

    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log('this location : ' + location.latitude);
        this.setState({location});
        Alert.alert(this.getWeather(location.latitude,location.longitude));
      },
      // error => Alert.alert(error.message),
      error => {
        Alert.alert(error.message + "Change Accuracy to Low");
        this.findCoordinatesLowAccuracy();
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
    );
  };

  findCoordinatesLowAccuracy = async() => {
    // Geolocation.getCurrentPosition(info => console.log(info));

    Geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);
          console.log('this location [LowAccuracy] : ' + location);
          this.setState({location});
          Alert.alert(this.getWeather(location.latitude,location.longitude));
        },
        error => Alert.alert(error.message),
        {enableHighAccuracy: false, timeout: 2000, maximumAge: 1000},
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
