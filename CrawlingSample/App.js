
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
        page: 0,
        items: [],
        title: '',
        url : '',
        image_url : '',
        date : '',
    };

  getNextPage = () =>
      this.setState(async state => {
        const page = state.page + 1;
        const items = await loadGraphicCards(page);

        await testJQeury();
        const res = await testJQeuryVol2();
        console.log("res : " + res.toString());

        console.log("items : "  + items.toString());
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
          <Text style={styles.footer}>Crolling With Cheerio!</Text>
        </View>
    )}

};



async function testJQeuryVol2(){

    // var bodyObj = jQuery('body')[0];  //tag로
    // var divObj = jQuery('#first')[0];  //id 값으로
    // var inputJObjs = jQuery('input');  // 해당 tag가 모두 접근된다.
    // var titleObj = jQuery('input[name=title]')[0]; // input tag이면서 name속성값이 title인 DOM에 접근
    // var buttonObj = $('input[type=button]')[0]; // tag와 type값으로 접근, $는 jQuery의 축약지시자이다.

    // const $bodyList = $("div.headline-list ul").children("li.section02");
    let ulList = [];
    const searchUrl = `https://www.yna.co.kr/sports/all`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text(); // get response text
    const $ = cheerio.load(htmlString);       // parse HTML string
    const $bodyList = $("div.headline-list ul").children("li.section02");

    $bodyList.each(function(i, elem) {
        ulList[i] = {
            title: $(this).find('strong.news-tl a').text(),
            url: $(this).find('strong.news-tl a').attr('href'),
            image_url: $(this).find('p.poto a img').attr('src'),
            date: $(this).find('span.p-time').text()
        };
    });

    const data = ulList.filter(n => n.title);
    return data;
}


async function testJQeury(){

    // var bodyObj = jQuery('body')[0];  //tag로
    // var divObj = jQuery('#first')[0];  //id 값으로
    // var inputJObjs = jQuery('input');  // 해당 tag가 모두 접근된다.
    // var titleObj = jQuery('input[name=title]')[0]; // input tag이면서 name속성값이 title인 DOM에 접근
    // var buttonObj = $('input[type=button]')[0]; // tag와 type값으로 접근, $는 jQuery의 축약지시자이다.

    // const $bodyList = $("div.headline-list ul").children("li.section02");

    const searchUrl = `https://blog.naver.com/dutxod2/221254125305`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text(); // get response text
    const $ = cheerio.load(htmlString);       // parse HTML string
    const $sectionList = $("div.se_component se_paragraph default").children("div.se_sectionArea");
    console.log($sectionList.toString());
    const body = $("#se_component se_paragraph default").map((_, li) => ({
        title : $(li).data("se_sectionArea"),
        price : $("h2",li).text(),
    }));
    console.log('body : ' + body);
}

async function loadGraphicCards(page = 1) {
  const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
  console.log('searchURL : ' + searchUrl);

  const response = await fetch(searchUrl);  // fetch page
  // const cheerio = require("cheerio");

    const htmlString = await response.text(); // get response text
    const $ = cheerio.load(htmlString);       // parse HTML string
    return $("#s-search-results").children("#s-search-results sg-row")
      .map((_, li) => ({                      // map to an list of objects
        asin: $(li).data("data-asin"),
        title: $("h2", li).text(),
        price: $("span.a-color-price", li).text(),
        // rating: $("span.a-icon-alt", li).text(),
        // imageUrl: $("img.s-access-image").attr("src")
      }));
}

const Item = props => (
    <TouchableOpacity onPress={() => alert("ASIN:" + props.asin)}>
      <Text>{props.title}</Text>
      <Image source={{uri: props.imageUrl}}/>
      <Text>{props.price}</Text>
      <Text>{props.rating}</Text>
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

