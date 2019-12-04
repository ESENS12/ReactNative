import React, { useState } from 'react'
import { useClipboard } from 'react-native-hooks'
import {
    Button,
    Text,
} from 'react-native';

export function Clipboard() {
    const [data, setString] = useClipboard();
    return(
        <>
            <Text>{data}</Text>
            <Button title='Update Clipboard' onPress={() => setString('new clipboard data')}>Set Clipboard</Button>
        </>
    )
}
