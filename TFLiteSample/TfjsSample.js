import * as tf from '@tensorflow/tfjs';
import React, {Component} from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tmImage from '@teachablemachine/image';


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
        // console.log('bundleResourceIOExample!');
        const image = require('./assets/img/blog_8.jpg');
        const image1 = require('./assets/img/not_blog_1.jpg');
        const image2 = require('./assets/img/blog_12.jpg');

        const imageAssetPath = Image.resolveAssetSource(image);
        // const imageAssetPath1 = Image.resolveAssetSource(image1);
        // const imageAssetPath2 = Image.resolveAssetSource(image2);
        // console.log('imageAssetPath');
        const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
        // const response1 = await fetch(imageAssetPath1.uri, {}, { isBinary: true });
        // const response2 = await fetch(imageAssetPath2.uri, {}, { isBinary: true });

        const rawImageData = await response.arrayBuffer();
        // const rawImageData1 = await response1.arrayBuffer();
        // const rawImageData2 = await response2.arrayBuffer();

        const imageTensor =  this.imageToTensor(rawImageData);
        // const imageTensor1 =  this.imageToTensor(rawImageData1);
        // const imageTensor2 =  this.imageToTensor(rawImageData2);

        // this.model.infer(imageTensor1);
        // this.model.infer(imageTensor2);

        // const predictions = await this.model.classify(imageTensor);
        const predictions = await this.model.predict(imageTensor);


        // Define a model
        // const model = tf.sequential();
        // model.add(tf.layers.dense({units: 5, inputShape: [1]}));
        // model.add(tf.layers.dense({units: 1}));
        // model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
        //
        // // Save the model to async storage
        // await model.save(asyncStorageIO('custom-model-test'));
        // // Load the model from async storage
        // await tf.loadLayersModel(asyncStorageIO('custom-model-test'));


        //use imagenet model
        // const imageAssetPath = Image.resolveAssetSource(image);
        // const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
        // const rawImageData = await response.arrayBuffer();
        // const imageTensor =  decodeJpeg(rawImageData,3);
        // const imageTensor =  this.imageToTensor(rawImageData);
        // const predictions = await this.model.classify(imageTensor);

        // const res = await model.predict(this.imageToTensor(rawImageData));

        console.log('------------------------------------');
        console.log('lankType : ' , predictions.rankType );
        console.log('strides : ' , predictions.strides[0] );
        console.log('shape[0] : ' , predictions.shape[0] , ", shape[1] : "  , predictions.shape[1] );
        console.log('predictions[0] : ' + predictions.className, ", probability : " + predictions.probability);
        // console.log('predictions[1] : ' + predictions[1].className, ", probability : " + predictions[1].probability);
        // console.log('predictions[2] : ' + predictions[2].className, ", probability : " + predictions[2].probability);
    }

    imageToTensor(rawImageData) {
        const TO_UINT8ARRAY = true;
        const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);

        const buffer = new Uint8Array(224 * 224 * 3);
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset];
            buffer[i + 1] = data[offset + 1];
            buffer[i + 2] = data[offset + 2];

            offset += 4
        }


        return tf.tensor3d(buffer, [224, 224, 3]).expandDims(0);
    }


    async componentDidMount() {
        // Wait for tf to be ready.
        await tf.ready();
        this.setState({
            isTfReady: true,
        },()=>{
            console.log("isTfReady!");
        });

        const URL = "https://teachablemachine.withgoogle.com/models/VC64D_5W/";
        const modelUrl = URL + "model.json";
        const metadataUrl = URL + "metadata.json";

        this.model = await tmImage.load(modelUrl, metadataUrl);

        console.log("this.model : " , this.model);
        var maxPredictions = model.getTotalClasses();
        console.log("maxPredictions : " , maxPredictions);
        // const modelJson = require('./assets/model.json');
        // const modelWeights = require('./assets/weights.bin');
        // const modelMetaData = require('./assets/metadata.json');

        // this.model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
        // this.model = await tf.models.modelFromJSON(modelJson);
        // this.model = await tf.loadGraphModel(modelUrl,{fromTFHub: false});

        // this.model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
        this.model.summary();


        // console.log("modelWeights: " + modelWeights);
        // console.log("modelJson: "+modelJson.modelTopology.config.name);
        //
        // this.model = await tf.loadLayersModel(bundleResourceIO(modelUrl, metadataUrl));
        // this.model = await tf.loadLayersModel(modelUrl);

        // this.model = await tf.load(modelURL, metadataURL);

        //imagenet model
        // this.model = await mobilenet.load();
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
