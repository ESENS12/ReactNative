import * as tf from '@tensorflow/tfjs';
import React, {Component} from 'react';
import '@tensorflow/tfjs-react-native';
import {
    View,
    SafeAreaView,
    Text,
        } from 'react-native';

export class TfjsSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTfReady: false,
        };
    }

    async componentDidMount() {
        // Wait for tf to be ready.
        await tf.ready();
        // Signal to the app that tensorflow.js can now be used.
        this.setState({
            isTfReady: true,
        });
    }


    render() {
        return(

            <SafeAreaView>

                {!this.state.isTfReady &&
                <Text> TF is Not Ready!
                </Text>
                }

                {this.state.isTfReady &&
                <Text> TF is Ready!
                </Text>}


            </SafeAreaView>
        )
    }
}
