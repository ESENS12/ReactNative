import useKeyboard from '@rnhooks/keyboard';
import React from 'react'
import {
    Button, Keyboard, StyleSheet,
    Text, TextInput,
    View,SafeAreaView
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export function KeyboardHandler() {

    const [visible, dismiss] = useKeyboard();

    return (
        <SafeAreaView style={styles.sectionContainer}>
            <View style={styles.textInputArea}>
                <Text style={styles.description}>Type Here :</Text>
                <TextInput placeholder={"Blah Blah Blah Blah.."} style={styles.textInput} onSubmitEditing={Keyboard.dismiss} />
            </View>
            <Text style={styles.welcome}>@rnhook/keyboard</Text>
            <Text style={styles.instructions}>{visible ? 'Keyboard Visible' : 'Keyboard Not Visible'}</Text>
            <Button title="Dismiss Keyboard" onPress={dismiss} />
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({

    textInputArea:{
        flexDirection:'row',
    },
    description:{
        fontSize:18,
    },

    textInput:{
        marginLeft : 15,
        padding:5,
        fontSize:15,
        backgroundColor: Colors.white,
        color : Colors.black,
        flex:1,
    },
    sectionContainer: {

    },
    welcome:{
        color: Colors.dark,
        fontSize: 12,
        marginTop : 100,
        fontWeight: '600',
        textAlign: 'center',
    },

    instructions: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    }
});
