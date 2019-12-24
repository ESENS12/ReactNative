import * as tf from '@tensorflow/tfjs';
import React, {Component} from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet'

import {
    View,
    SafeAreaView,
    Text,
    Image,
        } from 'react-native';
import {bundleResourceIO, decodeJpeg, fetch} from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js'

export class TfjsSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTfReady: false,
        };
    }

    async bundleResourceIOExample() {
        console.log('bundleResourceIOExample!');
        const modelJson = require('./assets/model.json');
        const modelWeights = require('./assets/weights.bin');
        const image = require('./assets/img/blog_8.jpg');

        //custom model
        // const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));

        // const imageAssetPath = Image.resolveAssetSource(image);
        // console.log('imageAssetPath');
        // const response = await tfrn.fetch(imageAssetPath.uri, {}, { isBinary: true }).then(console.log('response'));
        // // console.log('response');
        // const rawImageData = await response.arrayBuffer().then(console.log('getRawData'));
        //
        // const imageTensor = decodeJpeg(rawImageData,3);
        // console.log('getImageTensor');


        //use imagenet model
        const imageAssetPath = Image.resolveAssetSource(image);
        const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
        const rawImageData = await response.arrayBuffer();
        // const imageTensor =  decodeJpeg(rawImageData,3);
        const imageTensor =  this.imageToTensor(rawImageData);
        const predictions = await this.model.classify(imageTensor);

        // const res = await model.predict(this.imageToTensor(rawImageData));

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

        return tf.tensor3d(buffer, [height, width, 3])
    }


    async componentDidMount() {
        // Wait for tf to be ready.
        await tf.ready();
        this.setState({
            isTfReady: true,
        },()=>{

            console.log("isTfReady!");
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
