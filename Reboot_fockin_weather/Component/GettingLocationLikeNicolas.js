import {Platform, Alert, StyleSheet, Text, View} from 'react-native';
import React from "react"
import Constants from 'expo-constants';
import * as Location from "expo-location";
import  * as Permissions from 'expo-permissions';

export default class GettingLocationLikeNicolas extends React.Component {

    state = {
        location: null,
        errorMessage: null,
    };

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        Alert.alert(status.toString());
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }else{
            const location =  await Location.getCurrentPositionAsync();
            Alert.alert(location);
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
