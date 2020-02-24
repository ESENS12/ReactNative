import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

const myHtml = require('./web/index.html');
// let myJsLib = require('./web/clock.js');

export class MyWebview extends Component {

    constructor(props){
        super();
        this.state = {
            errors: []
        };
        this.props = props;
        this.init();


    }


    async init(){
        // const file = await AssetUtils.resolveAsync(require('./web/index.html'));
        // const fileContents = await FileSystem.readAsStringAsync(file.localUri);
        // this._editorHtml = fileContents;
        // console.log("props uri : " + this.props.uri);
        // const fs = require('react-native-fs');
        // const filePath = fs.DocumentDirectoryPath + '/clock.js';
        // console.log(fs.DocumentDirectoryPath);
        // const js = await fs.readFile(filePath, 'utf8').then(()=>{
        //     console.log('read file success');
        //
        // });
        // const json = 'module.exports = ' + JSON.stringify(js) + ';';
        // await fs.writeFile(fs.DocumentDirectoryPath + '/my-convert-clock.js', json);
        // myJsLib = filePath;

        // this.injectJSFileFromWeb();

    }


    render() {
        return (
            <WebView
                ref={ref=>(this.webview = ref)}
                originWhitelist={["*"]}
                allowFileAccess={true}
                source={{uri: 'https://github.com/facebook/react-native'}}
                // source={{ html: myHtml, baseUrl: '' }}
                // source={
                //     myHtml
                // }
                domStorageEnabled={true}
                allowUniversalAccessFromFileURLs={true}
                allowFileAccessFromFileURLs={true}
                mixedContentMode="always"
                javaScriptEnabled={true}
                style={{marginTop: 20}}
                onNavigationStateChange={this.handleWebViewNavigationStateChange}
                // injectedJavaScript={myJsLib}
                // onLoad={()=>{console.log("onload! : " ,myJsLib);}}
            />
        );
    }

    injectJSFileFromWeb() {
        //give the filename according to your need
        var jsFileName = "clock.js";
        var fp = `
        var corescript = document.createElement('script');
        corescript.type = 'text/javascript';
        corescript.src = "${jsFileName}";
        var parent = document.getElementsByTagName('head').item(0);
        parent.appendChild(corescript);
        void(0);
    `;
        this.webview.injectJavaScript(fp);
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
