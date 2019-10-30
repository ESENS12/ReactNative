
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
    };

  getNextPage = () =>
      this.setState(async state => {
        const page = state.page + 1;
        const items = await loadGraphicCards(page);
        console.log("items : "  + items.toString());
        return {items, page};
      });

    componentDidMount = () => this.getNextPage();

  render(){
    return(
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <ScrollView>
            {this.state.items.map(item => <Item {...item} key={item.asin}/>)}
          </ScrollView>
          <Text style={styles.footer}>Crolling With Cheerio!</Text>
        </View>
    )}

};

async function loadGraphicCards(page = 1) {
  const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
  console.log('searchURL : ' + searchUrl);

  const response = await fetch(searchUrl);  // fetch page
  // const cheerio = require("cheerio");

    const htmlString = await response.text(); // get response text
    // console.log('htmlString : ' + htmlString);
    const $ = cheerio.load(htmlString);       // parse HTML string

    return $("#s-results-list-atf > li")             // select result <li>s
      .map((_, li) => ({                      // map to an list of objects
        asin: $(li).data("asin"),
        title: $("h2", li).text(),
        price: $("span.a-color-price", li).text(),
        rating: $("span.a-icon-alt", li).text(),
        imageUrl: $("img.s-access-image").attr("src")
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

