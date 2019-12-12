import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {Button, SafeAreaView, View} from 'react-native';

export class MyWebview extends Component {

    constructor(props){
        super();
        this.state = {
            errors: [],
            uri : ''
        };
        this.props = props;
        this.init();
    }

    init(){
    //     this.setState(
    //         { uri : this.props.navigation.getParam('uri','null')}
    //     ,() => {
    //             console.log("props uri : " + this.state.uri);
    //         });


        console.log("webView OnCreate!");
    }

    render() {
        // const { navigate } = this.props.navigation;
        // const MainPage = 'MainPage';
        return (
            <SafeAreaView style={{flex:1}}>
                <WebView
                    source={{uri: this.props.navigation.getParam('uri','null')}}
                    onNavigationStateChange={this.handleWebViewNavigationStateChange}
                />
            </SafeAreaView>
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
        console.log("canGoBack : " + newNavState.canGoBack);
    }



}
