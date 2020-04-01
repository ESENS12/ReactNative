
import {Image, SafeAreaView, Text} from 'react-native';
import {bundleResourceIO, fetch} from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import React, {Component} from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs';

export class ImageClassifier extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isTfReady: false,
        };
    }

    async bundleResourceIOExample() {
        // console.log('bundleResourceIOExample!');
        const image = require('./assets/img/not_blog_1.jpg');

        //use imagenet model
        const imageAssetPath = Image.resolveAssetSource(image);
        const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
        const rawImageData = await response.arrayBuffer();
        const imageTensor =  this.imageToTensor(rawImageData);
        const predictions = await this.model.classify(imageTensor);

        // const res = await model.predict(this.imageToTensor(rawImageData));

        console.log('------------------------------------');
        // console.log('lankType : ' , predictions.rankType );
        // console.log('strides : ' , predictions.strides[0] );
        // console.log('shape[0] : ' , predictions.shape[0] , ", shape[1] : "  , predictions.shape[1] );
        console.log('predictions[0] : ' + predictions[0].className, ", probability : " + predictions[0].probability);
        console.log('predictions[1] : ' + predictions[1].className, ", probability : " + predictions[1].probability);
        console.log('predictions[2] : ' + predictions[2].className, ", probability : " + predictions[2].probability);
    }

    imageToTensor(rawImageData) {
        const TO_UINT8ARRAY = true;
        const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);

        const buffer = new Uint8Array(width * height * 3);
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset];
            buffer[i + 1] = data[offset + 1];
            buffer[i + 2] = data[offset + 2];

            offset += 4
        }


        return tf.tensor3d(buffer, [width, height, 3]).expandDims(0);
    }


    async componentDidMount() {
        // Wait for tf to be ready.
        await tf.ready();
        this.setState({
            isTfReady: true,
        },()=>{

            // console.log("isTfReady!");
        });

        this.model = await mobilenet.load();



        this.bundleResourceIOExample();
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
