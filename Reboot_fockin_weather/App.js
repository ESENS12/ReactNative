import React from "react";
import {Alert, Platform} from 'react-native';
import Loading from "./Component/Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Component/GettingLocationLikeNicolas";

const API_KEY = "35e5753f7bc1a760140b5cb3aadc058a";

export default class extends React.Component {
    state = {
        isLoading: true,
        errorMessage : null
    };
    getWeather = async (latitude, longitude) => {
        const {
            data: {
                main: { temp },
                weather
            }
        } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
        );
        this.setState({
            isLoading: false,
            condition: weather[0].main,
            temp
        });
    };
    getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();
            const {
                coords: { latitude, longitude }
            } = await Location.getCurrentPositionAsync();
            this.getWeather(latitude, longitude);
        } catch (error) {
            Alert.alert("Can't find you.", "So sad");
        }
    };

    getPermissionForAndroid = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION).then(Alert.alert(status));
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }else{
            this.setState({
                errorMessage: 'Permission Access',
            });
        }

    };

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.getPermissionForAndroid();
        } else {
            this.getLocation();
        }
    }
    render() {
        const { isLoading, temp, condition } = this.state;
        return isLoading ? (
            <Loading />
        ) : (
            <Weather temp={Math.round(temp)} condition={condition} />
        );
    }
}
