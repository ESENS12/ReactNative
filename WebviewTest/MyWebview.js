import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

export class MyWebview extends Component {
    render() {
        return (
            <WebView
                source={{uri: 'https://m.naver.com'}}
                style={{marginTop: 20}}
            />
        );
    }
}
