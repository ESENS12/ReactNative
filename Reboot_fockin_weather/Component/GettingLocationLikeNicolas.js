import {Platform, Alert, StyleSheet, Text, StatusBar, View} from 'react-native';
import React from "react"
import Constants from 'expo-constants';
import * as Location from "expo-location";
import  * as Permissions from 'expo-permissions';
import axios from 'axios';

import GetWeatherAPIKey from './myWeather.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions={
    undefined:{
      iconName: ""
    },
    Haze:{
        iconName : "weather-hail"
    },
    Clear:{
        iconName: "weather-sunny"
    },
};

// const API_KEY = '35e5753f7bc1a760140b5cb3aadc058a';

export default class GettingLocationLikeNicolas extends React.Component {

    state = {
        latitude : null,
        longitude : null,
        errorMessage: null,
        myWeather : null,
        myTemp : null,
    };


    //todo  - need to study ES6, and clean-up this shit hole

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }else{
            const location =  await Location.getCurrentPositionAsync();

            if(location !== null){
                console.log("lon : " + location.coords.longitude + " , lat : " + location.coords.latitude);

                this.setState({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                this.getWeather(this.state.latitude, this.state.longitude);
            }
        }
    };


    getWeather = async (latitude, longitude) => {
        try{
            const result_getWeather =  await axios.get(`http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&APPID=${GetWeatherAPIKey()}&units=metric`);
            console.log(JSON.stringify(result_getWeather.data));

            const jsonWeather = JSON.parse(JSON.stringify(result_getWeather.data));

            this.setState({
                myWeather: jsonWeather["weather"][0].main,
                myTemp : parseInt(jsonWeather["main"].temp)
            });

            console.log('myWeather : ' + this.state.myWeather);
            console.log('myTemp : ' + this.state.myTemp);
        }catch (e) {
            Alert.alert('Error!' + e.toString());
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

            // if(this.state.latitude !== null) {
            //     this.getWeather(this.state.latitude, this.state.longitude);
            // }

        }
    }

    render(){
        return (
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.container}>
                <StatusBar barStyle="light-content"/>

                <View style={styles.weatherContainer}>
                    <MaterialCommunityIcons style ={styles.icon} size={96} name = { weatherOptions['Clear'].iconName }/>
                    <Text style={styles.tempText}>{this.state.myTemp}°</Text>
                </View>
                <View style={styles.otherViewContainer}>
                    <Text style={styles.text}>Getting the Fucking Weather like Nicolas!</Text>
                </View>
            </LinearGradient>
        );
    }

}

GettingLocationLikeNicolas.defaultProps ={
    myWeather : "Clear"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingVertical: 100,
        alignItems: 'center',
        backgroundColor: '#FDF6AA',
    },
    icon:{
        color:'white',
    } ,
    weatherContainer:{
        flex: 1,
        justifyContent: 'center',
    },
    otherViewContainer:{
        flex:1,
        justifyContent: 'flex-end',
    },

    tempText: {
        marginTop : 25,
        color: 'white',
        textAlign : 'center',
        fontSize: 48,
    },

    text: {
        color: 'white',
        fontSize: 20, //20px
    },
});
