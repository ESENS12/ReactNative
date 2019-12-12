
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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import {BackHandler} from './Component/BackHandler';
const fakeBlogKeywordList = ["스토리앤","seoulouba","revu","weble","ohmyblog","mrblog","tble","dinnerqueen"];

/*
쉬즈블로그
디너의여왕
에코블로그
포블로그
리뷰플레이스
티블
놀러와체험단 = 이슈블로그 = 허니블로그
오른쪽방향으로 놀러와 체험단에서 파생된 체험단
미블
리얼리뷰
* */

//스토리앤 -> 스토리앤
//서울오빠 -> http://www.seoulouba.co.kr/
//레뷰(구 위블) -> https://www.revu.net/
//위블(현 레뷰) -> https://www.weble.net/
//오마이블로그 -> http://www.ohmyblog.co.kr // 특이사항 : tracking하지 않는 걸로 보임, img src 내부 아닌 href에 url이 박혀있는경우 있었음
//미블    -> mrblog.net
//티블    -> www.tble.kr
//어메이징블로그
//파블로체험단
//디너의 여왕 -> https://dinnerqueen.net/


async function getBlogResVol2(searchQuery, page){

  let ulList = [];
  const searchUrl = `https://search.naver.com/search.naver?query=${searchQuery}&sm=tab_pge&srchby=all&st=sim&where=post&start=${page}`;
  const response = await fetch(searchUrl);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  // console.log("search Url : "  + searchUrl);
  const $bodyList = $("li.sh_blog_top");

  // console.log("result items : "+$bodyList.length);
  $bodyList.each(function(i, elem) {

    ulList[i] = {
      title: $(this).find('.sh_blog_title._sp_each_url._sp_each_title').attr('title'),
      isFake : false,
      // index : itemIndex,
      // title: $(this).find('strong[name=news-tl]').text(),
      url: $(this).find('.sh_blog_title._sp_each_url._sp_each_title').attr('href'),
      // image_url: $(this).find('p.poto a img').attr('src'),
      // date: $(this).find('span.p-time').text(),
      // lead : $(this).find('p.lead').text()
    };
    // console.log("index : " + i + ", title : " + ulList[i].title);
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


      const response = await fetch(blogUrl);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);

      // console.log('$() se-post_ct : ' + $(".post_ct").length);
      // console.log('$() .post_ct img  : ' + $(".post_ct img").length);
      // console.log('$()._img  : ' + $("._img").length);

      // console.log('$() ._img  : ' + $("._img").length);
      // console.log('$() _img _inl fx  : ' + $("_img._inl.fx").length);

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

const Item = (props) => {

  if (props.isFake) {
    return null
  }

  return (
    <View style={styles.listItemParent}>
        {/*<Text style={styles.listItemText}> {props.index} </Text>*/}
        <Text style={styles.listItemText}> {props.title} </Text>
        <Text style={styles.listItemURL}> {props.url} </Text>
      <ScrollView
            showsHorizontalScrollIndicator = {true}
            indicatorStyle={'white'}
            horizontal={true}
            {...props._panResponder.panHandlers}
            onScrollEndDrag={() => props.fScroll.setNativeProps({ scrollEnabled: true })} >
        { props.imgList.map((item,index) => <Image key={index} style={{width: 350, height: 260}} source={{uri:item}} />) }
      </ScrollView>
        {/*<CarouselCardView key={props.url} imgList={props.imgList} title={props.title} />*/}
        {/*<Text>{props.lead}</Text>*/}
    </View>
  )
};

export class MainPage extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerBackTitle: 'Back',
    gesturesEnabled : false, //for iOS swipe
  };


  constructor(props) {
    super(props);

    this.state = {
      isProgress: false,
      page : 1 ,
      items : [],
      searchQuery : "서울대 맛집",
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

    const getItemRes  = await getBlogResVol2(this.state.searchQuery,this.state.page);

    this.setState( state => {
      return {items : this.state.items.concat(getItemRes), page};
      // return {items : getItemRes, page};
    }, callback =>{
      // console.log("item size : " + this.state.items.length);
      this.openProgressbar(false);
    });

  }

  componentDidMount(){
    this.getNextPage();
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

  render(){
    const { navigate } = this.props.navigation;
    const webview = 'MyWebview';
    return(

        <SafeAreaView style={styles.container}>
          <Button title={'gotoWebviewTest'} onPress={ ()=>  navigate(webview,{uri : 'https://m.naver.com'})}/>
          {this.state.isProgress && <CustomProgressBar/> }

            {/*<StatusBar barStyle="dark-content" />*/}
            <View style={styles.searchQueryParent}>
              <Text style={styles.searchQueryDescription}>검색어</Text>
              <TextInput
                  style={styles.searchQueryTextInput}
                  placeholder="SearchQuery"
                  onChangeText={(searchQuery) => this.setState({searchQuery : searchQuery})}
                  value={this.state.searchQuery}
              />
            </View>
            <Button title="Search it!" onPress={ ()=> this._searchIt()} />

            <ScrollView ref={(e) => { this.fScroll = e }} >
              { this.state.items.map(item => <Item key = {item.imgList[0]} fScroll = {this.fScroll} _panResponder = {this._panResponder} onPress={ ()=> this.onclick(item)} {...item} />) }
            </ScrollView>
            {/*<TouchableOpacity>*/}
            <Button title="SearchMore" onPress={ ()=> this.getNextPage()}/>
            {/*</TouchableOpacity>*/}
            <Text style={styles.footer}>Crawling Without ANNOYING Advertise</Text>
          <BackHandler/>
          </SafeAreaView>
    )}
}


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

