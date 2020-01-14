import React, { useState } from 'react'
import { useBackHandler } from 'react-native-hooks'


export function BackHandler() {

    useBackHandler(() => {
        if (true) {
            // handle it
            console.log('backButton!');
            return true
        }
        // let the default thing happen
        return false
    });

    return(
        <>

        </>
    )
}
