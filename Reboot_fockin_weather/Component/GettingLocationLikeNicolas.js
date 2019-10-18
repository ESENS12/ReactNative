import {Platform, Alert, StyleSheet, Text, View} from 'react-native';
import React from "react"
import Constants from 'expo-constants';
import * as Location from "expo-location";
import  * as Permissions from 'expo-permissions';
import axios from 'axios';

import GetWeatherAPIKey from './GetWeather.js'


// const API_KEY = '35e5753f7bc1a760140b5cb3aadc058a';

export default class GettingLocationLikeNicolas extends React.Component {

    state = {
        location: null,
        errorMessage: null,
    };

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }else{
            const location =  await Location.getCurrentPositionAsync();

            console.log("location : " + location);
            // Alert.alert('your location : ' , location.coords.latitude + ", " +  location.coords.longitude);

            if(location !== null){
                getWeather(location.coords.latitude, location.coords.longitude);
            }
        }
    };


    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });

            Alert.alert(this.state.errorMessage);
        //
        } else {
            this._getLocationAsync();
        }
    }

    getWeather = async (latitude, longitude) => {
        try{
            console.log("getWeather lat : " + latitude + ", lon : " + longitude);
            return await axios.get(`http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&APPID=${GetWeatherAPIKey()}`);
        }catch (e) {
            Alert.alert('Error!' + e.toString());
        }
    };


    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Getting the Fucking Weather like Nicolas!</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: '#FDF6AA',
    },
    text: {
        color: '#2c2c2c',
        fontSize: 20, //20px
    },
});
