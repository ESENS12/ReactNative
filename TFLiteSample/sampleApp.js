import React, { Component } from 'react';
import { Platform, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import Tflite from 'tflite-react-native';
import ImagePicker from 'react-native-image-picker';



const height = 350;
const width = 350;
const blue = "#25d5fd";
const mobile = "MobileNet";
const ssd = "SSD MobileNet";
const yolo = "Tiny YOLOv2";
const deeplab = "Deeplab";
const posenet = "PoseNet";

type Props = {};
export class SampleApp extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
            source: null,
            imageHeight: height,
            imageWidth: width,
            recognitions: []
        };


        this.tflite = new Tflite();
    }



    async componentDidMount(){
        console.log('tflite : ' + this.tflite === undefined);

        this.getModel();

    }

    getModel(){
        this.tflite.loadModel({
                model: './assets/model_unquant.tflite',
                labels: './assets/labels.txt',
                numThreads: 1,
            },
            (err, res) => {
                if(err)
                    console.log(err);
                else
                    console.log(res);
            });
    }

    render(){
        return(
            <>

            </>

        );
    }
}
