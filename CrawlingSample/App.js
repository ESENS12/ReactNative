
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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

async function getBlogResTest(searchQuery, page){

    // console.log("getSportsNews page : " + page);

    //블로그 검색
    //https://search.naver.com/search.naver?where=post&sm=tab_jum&query=검색어
    //https://search.naver.com/search.naver?&query=%EC%84%9C%EC%9A%B8%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD%20%ED%95%98%EB%82%A8%EB%8F%BC%EC%A7%80%EC%A7%91&sm=tab_pge&srchby=all&st=sim&where=post&start=11
    //https://search.naver.com/search.naver?query=%EC%84%9C%EC%9A%B8%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD%20%ED%95%98%EB%82%A8%EB%8F%BC%EC%A7%80%EC%A7%91&where=post&start=11
    //태그중에서 query, where, start 만 있으면 검색 가능 , query = 검색어, where = blog, start = 11(11..22..33... Start Item number)

    //todo 검색어를 입력받을 edittext를 만들어서 query를 넣어주고. nextpage 버튼 클릭시 다음 item 받아오도록 수정

    //div id="postListBody" -> div id="post_1" -> table id="printPost1" ->
    // ul id elThumbnailResultArea -> li sh_blog_top (class) sp_blog_1(id)

    // var bodyObj = $('body')[0];  //tag로
    // var divObj = $('#first')[0];  //id 값으로
    // var inputJObjs = $('input');  // 해당 tag가 모두 접근된다.
    // var titleObj = $('input[name=title]')[0]; // input tag이면서 name 속성값이 title인 DOM에 접근
    // var buttonObj = $('input[type=button]')[0]; // tag와 type값으로 접근
    // $(.'campaign_wrap).length => class로 판단


    //blog.naver.com/PostView.nhn?blogId=dutxod2&logNo=221605239025&redirect=Dlog&widgetTypeCall=true&directAccess=true
    //href="https://m.blog.naver.com/dabin8897/220595332941
    //todo 자꾸 mobile로 reponse가 넘어오는 문제가있는데...어차피 단말에서 돌릴 거니깐.....모바일로 하자....

    // 블로그 게시물 체크할때  blogId, logNo(게시물번호) 이 2가지 정보 필요함
    //$("#postListBody").length = id로 판단
    let ulList = [];
    const searchUrl = `https://search.naver.com/search.naver?query=${searchQuery}&sm=tab_pge&srchby=all&st=sim&where=post&start=${page}`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    // const $bodyList = $('[name="campaign_wrap"]').attr('class');
    // console.log($bodyList.length);

    //div main_pack -> div class blog section _blogBase _prs_blg
    //ul elThumbnailResultArea -> li class sh_blog_top

    const $bodyList = $("div.main_pack").children(".blog.section._blogBase._prs_blg").children("ul").children("li.sh_blog_top");//클래스에 공백이 들어가는 경우는 .로 치환(모두 선택할수밖에 없음)
    console.log("li length : "+$bodyList.length);


    // const $bodyList = $("div.headline-list").children("ul").children("li.section02");
    // const $bodyList = $("div.headline-list.ul li.section02");

    $bodyList.each(function(i, elem) {
        ulList[i] = {
            title: $(this).find('.sh_blog_title._sp_each_url._sp_each_title').attr('title'),
            // title: $(this).find('strong[name=news-tl]').text(),
            // url: $(this).find('strong.news-tl a').attr('href'),
            // image_url: $(this).find('p.poto a img').attr('src'),
            // date: $(this).find('span.p-time').text(),
            // lead : $(this).find('p.lead').text()
        };
    });

    // // const data = ulList.filter(n => n.title);
    console.log('data title: ' + ulList[0].title);

    return ulList;
}

//todo - list layout design , Add list bar event listener(update next page)

async function getSportsNews(page = 1){

    console.log("getSportsNews page : " + page);

    //div id="postListBody" -> div id="post_1" -> table id="printPost1" ->

    // var bodyObj = $('body')[0];  //tag로
    // var divObj = $('#first')[0];  //id 값으로
    // var inputJObjs = $('input');  // 해당 tag가 모두 접근된다.
    // var titleObj = $('input[name=title]')[0]; // input tag이면서 name 속성값이 title인 DOM에 접근
    // var buttonObj = $('input[type=button]')[0]; // tag와 type값으로 접근
    let ulList = [];
    const searchUrl = `https://www.yna.co.kr/sports/all/${page}`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text();
    //본문까지만 따온다음에,
    const $ = cheerio.load(htmlString);
    // const $bodyList = $("div.headline-list ul").children("li.section02");               //ul은 .children을 써도 되고, 안써도 되고..id가 없는경우에 가능한듯
    const $bodyList = $("div.headline-list").children("ul").children("li.section02");
    // const $bodyList = $("div.headline-list.ul li.section02");

    $bodyList.each(function(i, elem) {
        ulList[i] = {
            title: $(this).find('strong.news-tl a').text(),
            // title: $(this).find('strong[name=news-tl]').text(),
            url: $(this).find('strong.news-tl a').attr('href'),
            // image_url: $(this).find('p.poto a img').attr('src'),
            date: $(this).find('span.p-time').text(),
            lead : $(this).find('p.lead').text()
        };
    });

    // const data = ulList.filter(n => n.title);
    console.log('data length: ' + ulList[0].title);
    console.log('data length: ' + ulList.length);

    return ulList;
}
async function testJQeuryVol2(){

    // var bodyObj = $('body')[0];  //tag로
    // var divObj = $('#first')[0];  //id 값으로
    // var inputJObjs = $('input');  // 해당 tag가 모두 접근된다.
    // var titleObj = $('input[name=title]')[0]; // input tag이면서 name속성값이 title인 DOM에 접근
    // var buttonObj = $('input[type=button]')[0]; // tag와 type값으로 접근, $는 jQuery의 축약지시자이다.

    let ulList = [];
    const searchUrl = `https://www.yna.co.kr/sports/all`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    // const $bodyList = $("div.headline-list ul").children("li.section02");               //ul은 .children을 써도 되고, 안써도 되고..id가 없는경우에 가능한듯
    const $bodyList = $("div.headline-list").children("ul").children("li.section02");
    // const $bodyList = $("div.headline-list.ul li.section02");

    $bodyList.each(function(i, elem) {      //( indexInArray , elementOfArray )
        ulList[i] = {
            title: $(this).find('strong.news-tl a').text(),
            // title: $(this).find('strong[name=news-tl]').text(),
            url: $(this).find('strong.news-tl a').attr('href'),
            image_url: $(this).find('p.poto a img').attr('src'),
            date: $(this).find('span.p-time').text(),
            lead : $(this).find('p.lead').text()
        };
    });
    const data = ulList.filter(n => n.title);
    // console.log('data length: ' + data.length);
    return data;
}
async function loadGraphicCards(page = 1) {
  const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
  console.log('searchURL : ' + searchUrl);

  const response = await fetch(searchUrl);  // fetch page
  // const cheerio = require("cheerio");

    const htmlString = await response.text(); // get response text
    const $ = cheerio.load(htmlString);       // parse HTML string
    return $("#s-search-results").children("#s-search-results sg-row")
      .map((_, li) => ({                      // (elementOfArray, indexInArray)
        asin: $(li).data("data-asin"),
        title: $("h2", li).text(),
        price: $("span.a-color-price", li).text(),
        // rating: $("span.a-icon-alt", li).text(),
        // imageUrl: $("img.s-access-image").attr("src")
      }));
}

const Item = props => (

    <TouchableOpacity onPress={() => alert(props.lead)}>
      <Text>{props.title}</Text>
      <Image source={{uri: props.url}}/>
      <Text>{props.date}</Text>
      {/*<Text>{props.lead}</Text>*/}
    </TouchableOpacity>
);




export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page : 1 ,
            items : [],
            searchQuery : "맵당 신천점",

        };
    }

    // state = {
    //     items: [],      // props를 담을 배열
    //     page: 0,        // 페이지 인덱스
    //     searchQuery,    // 검색어
    // };

    // title: '',      // 제목
    // url : '',       // 원문 url
    // date : '',      // 날짜
    // lead : '',      // 내용

    /**
     *    setState는 비동기로 동작하므로..
     *     setstate 내부에서 await 호출이 불가능하다?
     *     비동기로 동작하는 setState대신 mobX 같은 컴포넌트를 사용하는 경우도 많은것 같고
     *     state는 변경될떄마다 항상 렌더링을 다시 하므로.. 렌더링 필요 여부에 따라서 사용하자
     *     * */

    async getNextPage() {

        const page = this.state.page + 1;
        // const items = await getSportsNews(page);
        const items  = await getBlogResTest();

        this.setState( state => {
            console.log("this.setState!");
            // const page = state.page + 1;
            // const items = await getSportsNews(page);
            console.log("items length(state) :" + this.state.items.length);
            console.log("items length(local) :" + items.length);
            return {items, page};
        }, callback =>{
            console.log("setState callback item length :" + this.state.items.length);
        });

        // getNextPage = () =>
        //     this.setState(async state => {
        //         console.log("this.setState!");
        //         const page = state.page + 1;
        //         // const items = await loadGraphicCards(page);
        //         const items = await getSportsNews(page);
        //         return {items, page};
        //     });

        // return new Promise(items => {
        //     this.setState(async items => {
        //         console.log("this.setState!");
        //         console.log("items length(state) :" + this.state.items.length);
        //         console.log("items length(local) :" + items.length);
        //         console.log("itemValue length(local) :" + itemValue.length);
        //         return {itemValue, pageValue};
        //         // items : itemValue;
        //         //     page : page,
        //     },items);
        // });
    }


    componentDidMount(){
        // this.getNextPage();
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.sectionDescription}>Search Query : </Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="SearchQuery"
                    onChangeText={(searchQuery) => this.setState({searchQuery : searchQuery})}
                    value={this.state.searchQuery}
                />
                <ScrollView>
                    {this.state.items.map(item => <Item {...item} key={item.title}/>)}
                </ScrollView>
                <TouchableOpacity onPress={getBlogResTest(this.state.searchQuery,this.state.page)}>
                    <Button title="getSearchList" />
                </TouchableOpacity>
                <Text style = {styles.sectionTitle}> Get State Items : {this.state.items.length} </Text>
                <Text style={styles.footer}>Crolling With Cheerio!</Text>
            </View>
        )}
};





const styles = StyleSheet.create({
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
  sectionDescription: {
    marginTop: 35,
      marginLeft : 10,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
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

