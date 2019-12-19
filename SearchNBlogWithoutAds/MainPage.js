
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
  StatusBar,
  Button,
  PanResponder,
    Modal,
    ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SearchBar from 'react-native-search-bar';

import {BackHandler} from './Component/BackHandler';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from "styled-components/native";
import Dots from 'react-native-dots-pagination';
import MyItem from './Component/MyItem';

const fakeBlogKeywordList = ["스토리앤","seoulouba","revu","weble","ohmyblog","mrblog","tble","dinnerqueen"];


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
        //todo 블로그 주소 잘못 치환 되는경우 있음
        blogUrl = ulList[i].url.replace("https://", "https://m.");
      }

      console.log("=========================================");
      console.log("blogUrl : " + blogUrl);

      //todo 다음 블로그는 exception 처리 ..BodyList를 파싱하는데에서 부터 문제가 됨
      //todo 다음외에도 다른 블로그들이 있음... 기존의 tag, class로 찾아가는 스크래핑 방법을 변경할 필요가 있음 (기능 확장)
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

        //response 200 check
        // const response = await fetch(blogUrl);

      $linkData.each(function (i, elem) {

        let atagData;
        if(elem.attribs.src == null) {
          atagData = elem.attribs.thumburl;
        }else{
          atagData = elem.attribs.src;
        }

        //지도나, 스티커, 프로필은 PASS
        if(elem.attribs.class === "se-sticker-image" || elem.attribs.class === 'se-map-image'
        || elem.attribs.alt === "프로필"){
          // console.log("this is map or stricker :" + atagData);
          return true
        }

        if(atagData != null){
            // console.log("atagData : ", atagData);
          imgList[i] = atagData.substring(0,atagData.lastIndexOf("?") + 1) + "type=w800";

        }else{

          console.log('atagData null');
          return true;
        }

        for (let j = 0; j < fakeBlogKeywordList.length; j++) {
          let fake = fakeBlogKeywordList[j];

          if (atagData.includes(fake)) {
            console.log("this is Fake post :  " + atagData);
            console.log("from : " + fake);
            b_isFake = true;
          }

        }
      });

      ulList[i].isFake = b_isFake;
      ulList[i].imgList = imgList;

      if (!b_isFake) {
        console.log("not fake");
      }

      // console.log("=======================================", i);
      // console.log("index : ", i , ", img : " ,ulList[i].imgList[0])
      // ulList[i].imgList.index = i;

      // console.log("not Fake Image TagNum : " + fakeNum );
      // console.log("ulList[i].isFake : " + ulList[i].isFake );
      console.log("imgList length : " + ulList[i].imgList.length );

    }catch (e) {
      console.log("## Exception : " + e.toString());
    }

  }

  return ulList;
}

export class MainPage extends React.Component {

  static navigationOptions = {
    title : "Home",
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

    // headerRight: () => (
    //     <Button
    //         onPress={this._searchOption}
    //         title="Option"
    //         color="#fff"
    //     />
    // ),

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
      searchQuery : "서울대입구역 맛집",
      itemIndex : 1,
    };
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
      this.openProgressbar(false);
    });

  }

  componentDidMount(){

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    this.setState({screenWidth : screenWidth, screenHeight : screenHeight});
    this.getNextPage();
    // this.refs.searchBar.focus();
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

  onclick(item){
    const { navigate } = this.props.navigation;
    const webview = 'MyWebview';
    console.log('onclick! ' + item.url);
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

              <TouchableWithoutFeedback style={{flex:2}} onPress={ ()=> this._searchOption()}>
                <Icon name="ios-funnel" size={25} color={"white"} style={{alignSelf:'center',flex:1}}/>
              </TouchableWithoutFeedback>

            </View>

            <ScrollView ref={(e) => { this.fScroll = e }}
                        onScroll={({nativeEvent}) => {
                            this.setState({isScrollEnd:isCloseToBottom(nativeEvent)})
                        }}
                        scrollEventThrottle={0}
            >
              { this.state.items.map((item,index) => <MyItem key = {index} fScroll = {this.fScroll} _panResponder = {this._panResponder}
                                                           onPress={ () => this.onclick(item)} state={this.state}   {...item} />) }
            </ScrollView>

          {this.state.items.length > 0 && this.state.isScrollEnd &&
          <TouchableOpacity style={styles.searchMoreBackground} onPress={ ()=> this.getNextPage()}>
            <Icon name="ios-arrow-down" size={25} color={"white"} style={{alignSelf:'center',flex:1}}/>
          </TouchableOpacity> }

            {/*<Text style={styles.footer}>Crawling Without ANNOYING Advertise</Text>*/}
          <BackHandler/>

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

