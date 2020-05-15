import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {
    ActivityIndicator,
    Button,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    BackHandler,
    ToastAndroid,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
        // BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
        // console.log(this.props.navigation);

    //     this.setState(
    //         { uri : this.props.navigation.getParam('uri','null')}
    //     ,() => {
    //             console.log("props uri : " + this.state.uri);
    //         });


        console.log("webView OnCreate!");
    }

    handleBackButton = () => {
        // console.log('handleBackButton[webview]!');
        // console.log('this.props.navigation.isFocused()[webview]!' , this.props.navigation.isFocused());

        //현재 페이지가 focused 되어있을때만 동작하도록
        // if(!this.props.navigation.isFocused()){
        //     return;
        // }
        //
        // 페이지에서는 백버튼 누르면 메인페이지로 돌아가야함.
        // this.props.navigation.goBack();
    };


    render() {
        // const { navigate } = this.props.navigation;
        // const MainPage = 'MainPage';

        return (
            <SafeAreaView style={{flex:1}}>
                <WebView
                    //todo add pageNotFound page
                    source={{uri: this.props.navigation.getParam('uri','null')}}
                    onNavigationStateChange={this.handleWebViewNavigationStateChange}
                    renderLoading={this.CustomProgressBar}
                    //Want to show the view or not
                    startInLoadingState={true}
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
        console.log("loading : " + newNavState.loading);
    };




    CustomProgressBar = ( ) => (
        <Modal transparent={true} onRequestClose={() => null} visible={true}>
            <View style={styles.progressModal}>
                <View style={{ borderRadius: 10, backgroundColor: 'white' ,padding: 25 }}>
                    <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
                    <ActivityIndicator size="large" />
                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({

// { flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }
    /**
     *    search query layout
     *
     * */

    progressModal:{
        position: 'absolute',
        alignItems: 'center',
        zIndex : 1 ,
        flex: 1,
        left : 0,
        top : 0,
        bottom: 0,
        right: 0,
        justifyContent : 'center',
        alignSelf: 'stretch',
        backgroundColor : 'transparent',

    },

    searchQueryParent:{
        flexDirection : 'row',
        backgroundColor: Colors.primary,
    },

    //검색어 editText
    searchQueryTextInput: {
        marginLeft : 10,
        fontSize : 20,
        flex: 1,
        textAlign : 'center',
        alignItems : 'flex-end',
        backgroundColor: Colors.white,
        color: Colors.dark,
    },

    //검색어 textview
    searchQueryDescription: {
        marginLeft : 10,
        fontSize: 18,
        fontWeight: '400',
        textAlign :'center',
        textAlignVertical: 'center',
        color: Colors.white,
    },

    /**
     *
     * listitem layout
     *
     * **/

    listItemParent:{
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',
    },

    listItemText:{
        flex:1,
        fontSize : 20,
        color : Colors.black,
    },

    listItemURL:{
        flex:1,
        fontSize : 20,
        color : Colors.primary,
    },

    scrollView: {
        backgroundColor: Colors.lighter,
    },

    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    container:{
        flex : 1,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },

    highlight: {
        fontWeight: '700',
    },

    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },

});
