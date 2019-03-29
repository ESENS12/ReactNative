
import React from 'react'
import {
    Image,
    Text,
    Alert,
    View,
    Button,
    StyleSheet,
    DeviceEventEmitter,
    NativeModules,
    TouchableOpacity, TouchableHighlight
} from 'react-native'

export default class WhateverComponent extends React.Component {

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

    _onClick(number){
        console.log("(whateverComponent) number is : " + number);
    }

    render() {
        return (

            <TouchableOpacity onPress={() => this._onClick(1)} style={styles.leftSide}/>

        );
    }

}



const styles = StyleSheet.create({

    leftSide: {
        //absolute를 주면 오버레이가 가능함
        position: 'absolute',
        //zIndex가 높은 순서대로 위에 표시된다.
        zIndex: 1,
        flex: 1,
        left: 0,
        top: 0,
        bottom: 0,
        right: "80%",
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'red',
    }

});