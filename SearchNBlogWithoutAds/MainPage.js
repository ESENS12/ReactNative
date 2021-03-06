
import React from 'react';
import cheerio from 'cheerio-without-node-native';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
    ToastAndroid,
  StatusBar,
  Button,
  PanResponder,
    Modal,
    ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
    BackHandler,
  Keyboard,
} from 'react-native';

import { withNavigationFocus } from 'react-navigation';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SearchBar from 'react-native-search-bar';
// import {BackHandler} from './Component/BackHandler';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from "styled-components/native";
import Dots from 'react-native-dots-pagination';
import MyItem from './Component/MyItem';
import {classfier} from './Component/BlogClassifier';

async function getBlogResVol2(searchQuery, page, searchOption){

  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);

  console.log('width : ' , screenWidth);
  console.log('height : ' , screenHeight);

  let ulList = [];
  const searchUrl = `https://search.naver.com/search.naver?query=${searchQuery}&sm=tab_pge&srchby=all&st=${searchOption}&where=post&start=${page}`;
  const response = await fetch(searchUrl);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  console.log("search Url : "  + searchUrl);
  const $bodyList = $("li.sh_blog_top");

  //sim -> 관련도순
  //date -> 날짜순

  // console.log("result items : "+$bodyList.length);
  $bodyList.each(function(i, elem) {

    //title, date,
    ulList[i] = {
      title: $(this).find('.sh_blog_title._sp_each_url._sp_each_title').attr('title'),
      isFake : false,
      currentIndex : 0,
      // index : itemIndex,
      // title: $(this).find('strong[name=news-tl]').text(),
      url: $(this).find('.sh_blog_title._sp_each_url._sp_each_title').attr('href'),
      // image_url: $(this).find('p.poto a img').attr('src'),
      date: $(this).find('.txt_inline').text(),
      // lead : $(this).find('p.lead').text()
    };
    console.log("index : " + i + ", date : " + ulList[i].date);
  });
  // console.log("===================================");

  for (let i = 0; i < ulList.length; i++) {
    let imgList = [];
    const url = ulList[i].url;
    let blogUrl = "";
    let b_isFake = false;

    try{

      if (url.includes("blog.me")) {
        let nickName = url.substring(url.indexOf("/") + 2, url.indexOf("."));
        let postNumber = url.substring(url.lastIndexOf("/") + 1);
        // https://m.blog.naver.com/conanronse?Redirect=Log&logNo=221607525803
        blogUrl = "https://m.blog.naver.com/" + nickName + "?Redirect=Log&logNo=" + postNumber;
      } else {
        blogUrl = ulList[i].url.replace("https://", "https://m.");
      }

      // https://m.blog.naver.com/choco900208?Redirect=Log&logNo=221611529559

      console.log("=========================================");
      console.log("blogUrl : " + blogUrl);

      if(!blogUrl.includes("blog.naver")){
        console.log("find DaumBlog! skip this blog");
        ulList[i].isFake = true;
        continue;
      }

      const response = await fetch(blogUrl);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);

      let $linkData;
      if($(".post_ct img").length > $("._img").length){
        $linkData = $(".post_ct img");
      }else{
        $linkData = $("._img");
      }

      let fakeNum = 0;

      $linkData.each(function (i, elem) {

        let atagData;
        if(elem.attribs.src == null) {
          atagData = elem.attribs.thumburl;
        }else{
          atagData = elem.attribs.src;
        }

        //지도나, 스티커, 프로필은 PASS
        if(elem.attribs.class === "se-sticker-image" || elem.attribs.class === 'se-map-image'
        || elem.attribs.alt === "프로필" ){
          // console.log("this is map or stricker :" + atagData);
          return true
        }

        if(atagData != null){
          imgList[i] = atagData.substring(0,atagData.lastIndexOf("?") + 1) + "type=w800";

        }else{
          console.log('atagData null');
          return true;
        }

          b_isFake = classfier(atagData);

      });

      ulList[i].isFake = b_isFake;
      ulList[i].imgList = imgList;

      if (!b_isFake) {
        console.log("not fake");
      }

      console.log("imgList length : " + ulList[i].imgList.length );

    }catch (e) {
      console.log("## Exception : " + e.toString());
    }

  }

  return ulList;
}

export class MainPage extends React.Component {


  static navigationOptions =({navigation}) =>{
    return {
        title : "Search Without Ads",
        headerBackTitle: 'Back',
        gesturesEnabled : false, //for iOS swipe
        headerStyle: {
          backgroundColor: '#03d05e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color:'white',
          fontSize: 20
        },
        // todo iphone guesture가 조악해서, UI버튼 필요하긴 함.
        // headerRight: () => (
        //     <Button
        //         onPress={this._searchOption}
        //         title="Option"
        //         color="#fff"
        //     />
        // ),

    };
  };
  //
  _searchOption = () => {

    let searchOption = '';

    if(this.state.searchOption === 'date'){
      searchOption = 'sim';
    }else{
      searchOption = 'date';
    }

    this.setState({searchOption:searchOption, items:[] , page : 1},()=> {
      this.getNextPage();
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      isProgress: false,
      page : 1 ,
      items : [],
      screenWidth : 0,
      screenHeight : 0,
      isScrollEnd: false,
      searchOption : 'sim',
      searchQuery : "",
      itemIndex : 1,
    };
    Icon.loadFont();
  }

  openProgressbar = (b_isOpen) => {
    this.setState({ isProgress: b_isOpen })
  };

  _searchIt(){
    const items = this.state.items;
    const page = this.state.page;
    const itemIndex  = this.state.itemIndex;

    this.setState(state => {
      return {items : [], page : 1, itemIndex : 0};
    }, callback =>{
      // console.log("searchit!" + "items : " + this.state.items + ", page : " + this.state.page + ", itemIndex : " + this.state.itemIndex);
      this.getNextPage();
    });

  }

  //다음 페이지 로딩하여 Item Update
  async getNextPage() {

    const page = this.state.page+10;
    // const items = await getSportsNews(page);
    // const getItemRes  = await getBlogRes(this.state.searchQuery,this.state.page);
    this.openProgressbar(true);

    const getItemRes  = await getBlogResVol2(this.state.searchQuery,this.state.page,this.state.searchOption);

    this.setState( state => {
      return {items : this.state.items.concat(getItemRes), page};
      // return {items : getItemRes, page};
    }, callback =>{
      // console.log("item size : " + this.state.items.length);
      console.log("dismiss keyboard ");
      this.openProgressbar(false);
      this.refs.searchBar.unFocus();
      Keyboard.dismiss;
    });

  }


    handleBackButton = () => {
      // navigator.getCurrentRoutes().length >
      // this.props.navigation.state.route
      console.log("route.routes.length  : " , this.props.navigation.state);
      console.log('handleBackButton[mainPage]!');
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (this.exitApp == undefined || !this.exitApp) {
            ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
            this.exitApp = true;

            this.timeout = setTimeout(
                () => {
                    this.exitApp = false;
                },
                2000    // 2초
            );
        } else {
            clearTimeout(this.timeout);

            BackHandler.exitApp();  // 앱 종료
        }
        return true;
    };

  componentDidMount(){

    this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
    );

    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);

    //webview에서 돌아왔을때 호출됨
    this.props.navigation.addListener('willFocus', () => {
        // console.log('willFocus!');
        BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    });

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    this.setState({screenWidth : screenWidth, screenHeight : screenHeight});
    // this.getNextPage();

    // console.log(this.refs.searchBar.focus());

    this._panResponder = PanResponder.create({

      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt,gestureState) => {
          // console.log('onMoveShouldSetPanResponderCapture');
        return Math.abs(gestureState.dy) > 2 ;
      },
      onPanResponderGrant: (e, gestureState) => {
          // console.log('onPanResponderGrant! ');
        this.fScroll.setNativeProps({ scrollEnabled: true })
      },
      onPanResponderMove: () => { },
      onPanResponderTerminationRequest: () => true,
    })
  }


  _keyboardDidShow() {
    console.log('Keyboard Shown');
  }

  _keyboardDidHide() {
    console.log('Keyboard Hidden');
  }

  onclick(item){
    const { navigate } = this.props.navigation;
    const webview = 'MyWebview';
    console.log('onclick! ' + item.url);
    // BackHandler.

    BackHandler.removeEventListener('hardwareBackPress',this.handleBackButton);
    navigate(webview,{uri : item.url});
  }

  render(){
    // const { navigate } = this.props.navigation;
    // const webview = 'MyWebview';
    return(

        <SafeAreaView style={styles.container}>
          {this.state.isProgress && <CustomProgressBar/> }

            <View style={styles.searchQueryParent}>

              <SearchBar style={[styles.searchBar,{width:this.state.screenWidth-60}]}
                  ref="searchBar"
                  placeholder="Search"
                  hideBackground={true}
                  onChangeText={(searchQuery) => this.setState({searchQuery : searchQuery})}
                  onSearchButtonPress={()=> this._searchIt()}
                  onCancelButtonPress={() => this.setState({searchQuery : ""})}
              />

              <TouchableWithoutFeedback style={{flex:2, alignContent:'center'}} onPress={ ()=> this._searchOption()}>
                <Icon name="ios-funnel" size={25} color={"white"} style={{margin:8,alignSelf:'center',flex:1}}/>
              </TouchableWithoutFeedback>

            </View>

            <ScrollView ref={(e) => { this.fScroll = e }}
                        removeClippedSubviews={true}
                        onScroll={({nativeEvent}) => {
                            this.setState({isScrollEnd:isCloseToBottom(nativeEvent)})
                        }}
                        scrollEventThrottle={0}
            >
              { this.state.items.map((item,index) => <MyItem key = {index} fScroll = {this.fScroll} _panResponder = {this._panResponder}
                                                            onPress={ () => this.onclick(item)}
                                                             state={this.state}   {...item} />) }
            </ScrollView>

          {this.state.items.length > 0 && this.state.isScrollEnd &&
          <TouchableOpacity style={styles.searchMoreBackground} onPress={ ()=> this.getNextPage()}>
            <Icon name="ios-arrow-down" size={25} color={"white"} style={{alignSelf:'center',flex:1}}/>
          </TouchableOpacity> }

            {/*<Text style={styles.footer}>Crawling Without ANNOYING Advertise</Text>*/}
          {/*<BackHandler pressdTime={100} />*/}

          </SafeAreaView>
    )}
}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

const CustomProgressBar = ({ visible }) => (
    <Modal transparent={true} onRequestClose={() => null} visible={visible}>
        <View style={styles.progressModal}>
            <View style={{ borderRadius: 10, backgroundColor: 'white' ,padding: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        </View>
    </Modal>
);


const BoxShadow = styled.View`
  box-shadow: 10px 5px 5px black;
`;

const styles = StyleSheet.create({

// { flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }


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

  /**
   *    search query layout
   *
   * */

  searchQueryParent:{
    height:45,
    alignSelf:'stretch',
    backgroundColor:'#03d05e',
    flexDirection:'row',
    // flex : 1,
    // backgroundColor: Colors.primary,
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

  //검색바
  searchBar: {
    flex:8,
    fontSize:180,
    height:30,
    alignSelf: 'center',
    borderWidth : 0,
    borderRadius: 10,
    // backgroundColor:'#03d05e',
    textAlignVertical: 'center',
  },
  /**
   *
   * listitem layout
   *
   * **/

  bottomLine:{

    alignSelf:'stretch',
    marginTop:20,
    marginRight:20,
    marginLeft:20,
    borderStyle:'dashed',
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    height:1,

  },

  listItemParent:{
    padding:5,
    shadowColor: '#000',
    overflow:'hidden',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flex:1,

    borderRadius:15,
    borderWidth: 1,
    // padding:10,
    margin:10,
    alignSelf:'center',
    borderColor: 'transparent',
    backgroundColor: '#fff',
  },

  searchMoreBackground:{
    marginTop:10,
    backgroundColor:'#03d05e',
    borderRadius:3,
    borderWidth: 0.01,
    height : 35,
    // borderColor: '#fff',
  },

  searchMoreText:{
    fontSize:20,
    textAlignVertical:'center',
    textAlign:'center',
    alignSelf:'center',
    color:'#fff',
    flex:1,
  },

  listItemText:{
    flex:1,
    fontSize : 20,
    color : Colors.black,
    marginBottom:5,
  },

  listItemDate:{
    flex:1,
    fontSize : 15,
    alignSelf:'flex-end',
    color : Colors.black,
    marginBottom:5,
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
    backgroundColor: '#fff',
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

  // bold: Platform.OS === 'ios' ? {
  //   fontFamily: 'NanumGothicBold',
  //   fontWeight: 'bold'
  // } : {
  //   fontFamily: 'NanumGothicBold'
  // },

  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },

});

