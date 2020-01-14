import React, { useState } from 'react'
import { useDeviceOrientation } from 'react-native-hooks'
import {
    View,
} from 'react-native';


export function DeviceOrientation() {
    const orientation = useDeviceOrientation();

    //layout contain x, y, width, height value
    if(orientation.portrait){
        console.log('orientation portrait');
    }

    if(orientation.landscape){
        console.log('orientation landscape');
    }

    return(
        <View style={{alignSelf:'stretch' , height: 200, marginTop: 30, marginLeft:24, marginRight:24,backgroundColor:'black',}} />
    )
}
