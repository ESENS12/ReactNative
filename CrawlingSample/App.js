
import React from 'react';
import cheerio from 'cheerio-without-node-native';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
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

export default class extends React.Component {

    state = {
        page: 0,        // 페이지 인덱스
        items: [],      // props를 담을 배열
        // title: '',      // 제목
        // url : '',       // 원문 url
        // date : '',      // 날짜
        // lead : '',      // 내용
    };

    /**
     *    setState는 비동기로 동작하므로..
     *
     * */
  getNextPage = () =>
      this.setState(async state => {
         console.log("this.setState!");
        const page = state.page + 1;
        // const items = await loadGraphicCards(page);
        const items = await getSportsNews(page);
        return {items, page};
      });

    componentDidMount = () => this.getNextPage();

  render(){
    return(
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <ScrollView>
            {this.state.items.map(item => <Item {...item} key={item.title}/>)}
          </ScrollView>
            <TouchableOpacity onPress={getSportsNews()}>
                <Button title="getNextPage"/>
            </TouchableOpacity>
            <Text style = {styles.sectionTitle}> get State Items : {this.state.items.length} </Text>
          <Text style={styles.footer}>Crolling With Cheerio!</Text>
        </View>
    )}
};



async function getSportsNews(page = 1){

    console.log("getSportsNews : " + page);

    // var bodyObj = $('body')[0];  //tag로
    // var divObj = $('#first')[0];  //id 값으로
    // var inputJObjs = $('input');  // 해당 tag가 모두 접근된다.
    // var titleObj = $('input[name=title]')[0]; // input tag이면서 name 속성값이 title인 DOM에 접근
    // var buttonObj = $('input[type=button]')[0]; // tag와 type값으로 접근
    let ulList = [];
    const searchUrl = `https://www.yna.co.kr/sports/all/${page}`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text();
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
    // console.log('data length: ' + ulList.length);
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
    console.log('data length: ' + data.length);
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
    <TouchableOpacity onPress={() => alert("")}>
      <Text>{props.title}</Text>
      <Image source={{uri: props.url}}/>
      <Text>{props.date}</Text>
      <Text>{props.lead}</Text>
    </TouchableOpacity>
);



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
    marginTop: 8,
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

