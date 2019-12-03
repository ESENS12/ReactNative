import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

export class MyWebview extends Component {


    constructor(props){
        super();
        this.state = {
            errors: []
        };
        this.props = props;
        this.init();
    }

    init(){
        console.log("props uri : " + this.props.uri);
    }

    render() {
        return (
            <WebView
                source={{uri: this.props.uri}}
                style={{marginTop: 20}}
                onNavigationStateChange={this.handleWebViewNavigationStateChange}
            />
        );
    }

    handleWebViewNavigationStateChange = newNavState =>{


        // newNavState values...
        // canGoBack = false
        // canGoForward = false
        // loading = false
        // target = 3
        // title = "NAVER"
        // url = "https://m.naver.com/"
        console.log("newNavState : " + newNavState);
    }
}
