import React, { useState } from 'react'
import { useLayout } from 'react-native-hooks'
import {
    View,
} from 'react-native';


export function Layout() {
    const { onLayout, ...layout } = useLayout();

    //layout contain x, y, width, height value
    console.log('layout.width :', layout.width,', layout.height :', layout.height, ' layout.x :', layout.x, ' layout.y :',layout.y);

    return(
        <>
            <View onLayout={onLayout} style={{alignSelf:'stretch' , height: 200, marginTop: 30, marginLeft:24, marginRight:24, backgroundColor:'black',}} />
        </>
    )
}
