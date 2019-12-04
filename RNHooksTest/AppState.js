import React, { useState } from 'react'
import { useAppState } from 'react-native-hooks'


export function CurrentAppState() {
    const currentAppState = useAppState();

    return(
        <>
            {console.log("currentAppState : " + currentAppState )}
        </>
    )
}
