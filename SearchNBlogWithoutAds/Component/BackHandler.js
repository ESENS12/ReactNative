import React, { useState } from 'react'
import { useBackHandler } from 'react-native-hooks'

//Back handler for Android(Hardware Back event)

export function BackHandler() {

    useBackHandler(() => {
        if (true) {
            //todo  2sec handling
            console.log('backButton!');
            return true
        }

        return false
    });

    return(
        <>
        </>
    )
}
