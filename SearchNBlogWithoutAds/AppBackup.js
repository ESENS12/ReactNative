
import React from 'react';
import cheerio from 'cheerio-without-node-native';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {CarouselCardView} from './Component/CarouselCardView';

import {arrowFunctionExpression} from '@babel/types';
import Carousel from './Component/CarouselCardView';
import styled from 'styled-components/native/dist/styled-components.native.esm';

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

      console.log('$() se-post_ct : ' + $(".post_ct").length);
      console.log('$() .post_ct img  : ' + $(".post_ct img").length);
      console.log('$()._img  : ' + $("._img").length);

      // console.log('$() ._img  : ' + $("._img").length);
      // console.log('$() _img _inl fx  : ' + $("_img._inl.fx").length);

      let $linkData;
      if($(".post_ct img").length > 0){
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
         //지도나, 스티커는 PASS
        if(elem.attribs.class === "se-sticker-image" || elem.attribs.class === 'se-map-image'){
          // console.log("this is map or stricker :" + atagData);
          return true
        }

          if(atagData != null){

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
        console.log("not fake : " + ulList[i].url);
      }

      // console.log("=======================================", i);
      // console.log("index : ", i , ", img : " ,ulList[i].imgList[0])
      // ulList[i].imgList.index = i;

      // console.log("not Fake Image TagNum : " + fakeNum );
      console.log("ulList[i].isFake : " + ulList[i].isFake );
      console.log("ulList[i].imgList : " + ulList[i].imgList.length );

    }catch (e) {
      console.log("## Exception : " + e.toString());
    }

  }
  return ulList;
}

async function getBlogRes(searchQuery, page){

  /**
   *  터치 -> 밑으로 expand되면서 imageView나옴 -> 어차피 Image는 광고여부판단시 수집하니까 image view에 그려준다음에 좌<->우 snap 방식으로 이미지만 넘겨보다가 아래 내용 클릭하면 해당 blog redirect
   *
   * */

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

      console.log('$() se-component.se-image a  : ' + $(".se-component.se-image a").length);
      console.log('$() se-component.se-image div  : ' + $(".se_component.se_image div").length);
      console.log('$() se-component  : ' + $(".se-component").length);
      console.log('$() se-image  : ' + $(".se-image").length);
      console.log('$() _img  : ' + $("._img").length);
      console.log('$() img  : ' + $(" img").length);

      //todo  이미지 여러개 겹쳐서 올리는경우는 스크래핑 안함. (다른 클래스이므로)
      let $linkData = $(".se-component.se-image a");
        if ($linkData.length <= 0) {
          //se_component se_image default

          //se_component se_imageStrip imageStrip2 default

          //se_mediaArea __se_image_link __se_link
          $linkData = $(".se_component.se_image div");
        }

      let fakeNum = 0;

      $linkData.each(function (i, elem) {
        // console.log("i : " + i);
        // console.log("elem : " + elem);
        let atagData = $(this).attr('data-linkdata');
        // console.log(atagData);
        if(atagData == null){
          atagData = $(this).find("a").attr('data-linkdata');
        }

        //todo negative or positive 방식 테스트 해봐야함
        if (atagData.includes("pstatic.net")) {
          fakeNum += 1;
        }

        if (atagData != null) {

          // imgList[i] = JSON.parse(atagData).src;
          if ($(this).find('img').attr('src').length <= 0) {
            console.log('$(this).find(\'img\').attr(\'src\'); not found ');
          }
          imgList[i] = $(this).find('img').attr('src');
          // console.log('imglist[i] :' + imgList[i]);
          for (let j = 0; j < fakeBlogKeywordList.length; j++) {
            let fake = fakeBlogKeywordList[j];
            if (atagData.includes(fake)) {
              console.log("this is Fake post :  " + atagData);
              console.log("from : " + fake);
              b_isFake = true;
            }
          }
          //todo fake는 걸러내야할지,,data index 싱크 맞추는게 편한지는 생각해봐야함

        } else {
          console.log('atagData null!');
        }
      });

      ulList[i].isFake = b_isFake;
      ulList[i].imgList = imgList;

      if (!b_isFake) {
        console.log("not fake : " + ulList[i].url);
      }
      // console.log("=======================================", i);
      // console.log("index : ", i , ", img : " ,ulList[i].imgList[0])
      // ulList[i].imgList.index = i;

      console.log("not Fake Image TagNum : " + fakeNum );
      console.log("ulList[i].isFake : " + ulList[i].isFake );
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


  // if(props.imgList.length <= 0){
  //   console.log("imglist is null");
  //   return (
  //       //이미지 리스트 null 인 경우
  //       <TouchableOpacity onPress={props.onPress} style={styles.listItemParent}>
  //         {/*<Text style={styles.listItemText}> {props.index} </Text>*/}
  //         <Text style={styles.listItemText}> {props.title} </Text>
  //         <Text style={styles.listItemURL}> {props.url} </Text>
  //         {/*<CarouselCardView key={props.url} imgList={props.imgList} title={props.title} />*/}
  //         {/*<Text>{props.lead}</Text>*/}
  //       </TouchableOpacity>
  //   )
  // }else{
    return (


        <TouchableOpacity onPress={props.onPress} style={styles.listItemParent}>
          {/*<Text style={styles.listItemText}> {props.index} </Text>*/}
          <Text style={styles.listItemText}> {props.title} </Text>
          <Text style={styles.listItemURL}> {props.url} </Text>
          <CarouselBackgroundView>
            <Carousel
                ref={ (c) => { this._carousel = c; } }
                data={props.imgList}
                renderItem={this._renderItem.bind(props)}
                onSnapToItem={this.handleSnapToItem.bind(this)}
                sliderWidth={360}
                itemWidth={256}
                layout={'default'}
                firstItem={0}
            />
          </CarouselBackgroundView>

          {/*<Text>{props.lead}</Text>*/}
        </TouchableOpacity>

        // <CarouselCardView key={props.url} imgList={props.imgList} title={props.title} />

        // <TouchableOpacity onPress={props.onPress} style={styles.listItemParent}>
        //   {/*<Text style={styles.listItemText}> {props.index} </Text>*/}
        //   <Text style={styles.listItemText}> {props.title} </Text>
        //   <Text style={styles.listItemURL}> {props.url} </Text>
        //   <CarouselCardView key={props.url} imgList={props.imgList} title={props.title} />
        //   {/*<Text>{props.lead}</Text>*/}
        // </TouchableOpacity>

    )
  // }

};

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page : 1 ,
      items : [],
      searchQuery : "서울대 맛집",
      itemIndex : 1,
      props : [],
    };

    this.props = props;
    this._carousel = {};
    this._renderItem = this._renderItem.bind(this);

  }

  handleSnapToItem(index){
    // console.log("item : ", this.props.title ,"snapped to ", index)
  }

  _renderItem = ( {item, index} ) => {
    // console.log('renderItem ' + item);
    return (
        <ThumbnailBackgroundView>
          <CurrentVideoTO
              onPress={ () => {
                console.log("clicked to index", index);
                this._carousel.snapToItem(index);
              }}
          >
          <CurrentVideoImage source={{ uri: this.props.imgList[index] }} />
          </CurrentVideoTO>
          {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
          <VideoTitleText>{index}</VideoTitleText>
        </ThumbnailBackgroundView>
    );
  };

  onclick(index) {
    console.log("onclick item : " + index.url);
  }

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
    const getItemRes  = await getBlogResVol2(this.state.searchQuery,this.state.page);

    this.setState( state => {
      return {items : this.state.items.concat(getItemRes), page};
      // return {items : getItemRes, page};
    }, callback =>{
      // console.log("item size : " + this.state.items.length);
    });

  }

  componentDidMount(){
    this.getNextPage();
  }

  render(){
    return(
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.searchQueryParent}>
            <Text style={styles.searchQueryDescription}>Search Query : </Text>
            <TextInput
                style={styles.searchQueryTextInput}
                placeholder="SearchQuery"
                onChangeText={(searchQuery) => this.setState({searchQuery : searchQuery})}
                value={this.state.searchQuery}
            />
          </View>
          <Button title="Search it!" onPress={ ()=> this._searchIt()} />

          <ScrollView>
            { this.state.items.map((item, index)=> <CarouselCardView key={index} onPress={ ()=> this.onclick(item)}  {...item} />) }
          </ScrollView>

          {/*<TouchableOpacity>*/}
          <Button title="SearchMore" onPress={ ()=> this.getNextPage()}/>
          {/*</TouchableOpacity>*/}
          <Text style={styles.footer}>Crolling With Cheerio!</Text>
        </View>
    )}
};


const styles = StyleSheet.create({

  /**
   *    search query layout
   *
   * */
  searchQueryParent:{
    marginTop : 45,
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
    color: Colors.white,
  },

  /**
   *
   * listitem layout
   *
   * **/

  listItemParent:{
    margin : 10,
    backgroundColor: Colors.light,
    flexDirection: 'column'
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

const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`;
const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256; 
`;

const CurrentVideoTO = styled.TouchableOpacity`
`;
const CarouselBackgroundView = styled.View`
  background-color: black;
  height: 200;
  width: 100%;
`;
