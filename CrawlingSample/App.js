
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

var itemIndex = 0;




async function getBlogResTest(searchQuery, page){

    //todo 검색어 edittext 텍스트 내용 바뀔때마다 setState해주면서 Re-rendering -> Crawling까지 .. UI 구조랑 백엔드 구조가 강결합되어있는 형태를 느슨하게 바꿔야함

    // var bodyObj = $('body')[0];  //tag로
    // var divObj = $('#first')[0];  //id 값으로
    // var inputJObjs = $('input');  // 해당 tag가 모두 접근된다.
    // var titleObj = $('input[name=title]')[0]; // input tag이면서 name 속성값이 title인 DOM에 접근
    // var buttonObj = $('input[type=button]')[0]; // tag와 type값으로 접근
    // $(.'campaign_wrap).length => class로 판단
    // $("#postListBody").length = id로 판단

    // href="https://blog.naver.com/purekth2337?Redirect=Log&logNo=221577070707"
    // https://blog.naver.com/PostView.nhn?blogId=purekth2337&logNo=221577070707
    // blog.naver.com/PostView.nhn?blogId=dutxod2&logNo=221605239025&redirect=Dlog&widgetTypeCall=true&directAccess=true
    // href="https://blog.naver.com/dabin8897/220595332941

    // 블로그 게시물 체크할때  blogId, logNo(게시물번호) 이 2가지 정보 필요함

    const Nblog_baseUrl = 'https://blog.naver.com/PostView.nhn?';
    //Nblog_baseUrl + blogid=dutxod2&logNo=2215770970707;

    let ulList = [];
    const searchUrl = `https://search.naver.com/search.naver?query=${searchQuery}&sm=tab_pge&srchby=all&st=sim&where=post&start=${page}`;
    const response = await fetch(searchUrl);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const $bodyList = $("div.main_pack").children(".blog.section._blogBase._prs_blg").children("ul").children("li.sh_blog_top"); //클래스에 공백이 들어가는 경우는 .로 치환(모두 선택할수밖에 없음)

    console.log("result items : "+$bodyList.length);

    $bodyList.each(function(i, elem) {
        itemIndex += 1;
        ulList[i] = {
            title: $(this).find('.sh_blog_title._sp_each_url._sp_each_title').attr('title'),
            index : itemIndex,
            // title: $(this).find('strong[name=news-tl]').text(),
            url: $(this).find('.sh_blog_title._sp_each_url._sp_each_title').attr('href'),
            // image_url: $(this).find('p.poto a img').attr('src'),
            // date: $(this).find('span.p-time').text(),
            // lead : $(this).find('p.lead').text()
        };
    });

    //애초에 리스트에 add 할때 조건따라서 넣는 방식 or 검색결과 리스트와, 광고형, 비광고형 리스트 별도로 관리하던가(UI 레벨에서 광고형은 배경색이 있다던지 하는 형태로..?)
    for (let i = 0; i < ulList.length; i++) {
        const searchUrl = ulList[i].url.replace("https://","https://m.");
        console.log("searchUrl : " + searchUrl);
        // const response = await fetch(searchUrl);
        // const htmlString = await response.text();
        // const $ = cheerio.load(htmlString);
    }

    return ulList;
}

// {/*<TouchableOpacity onPress={() => alert(props.lead)}>*/}

const Item = props => (

    <TouchableOpacity style={styles.listItemParent}>
        <Text style={styles.listItemText}> {props.index} </Text>
        <Text style={styles.listItemText}> {props.title} </Text>
        <Text style={styles.listItemURL}> {props.url} </Text>
      {/*<Text>{props.date}</Text>*/}
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
            itemIndex : 1,
        };
    }

    _onPressTest(){
        const page = this.state.page+1;
        console.log("onPress : " + page);
        this.setState({page : page});
    }

    //todo 마지막 페이지 감지, 검색결과에서 광고, 비광고 list 거르기 , items에 push하니까 이전결과 날아감,(list array handling) 아니면 아예 방식 바꿔서 paging 처리..or infinity scroll style

    _searchIt(){
        const items = this.state.items;
        const page = this.state.page;
        const itemIndex  = this.state.itemIndex;

        this.setState(state => {
            return {items : [], page : 0, itemIndex : 0};
        }, callback =>{
            this.getNextPage();
        });

    }

    async getNextPage() {

        const page = this.state.page+1;
        // const items = await getSportsNews(page);
        const getItemRes  = await getBlogResTest(this.state.searchQuery,this.state.page);

        this.setState( state => {
            return {items : this.state.items.concat(getItemRes), page};
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
                    {this.state.items.map(item => <Item {...item} />)}
                </ScrollView>
                {/*<TouchableOpacity>*/}
                <Button title="getNextPage" onPress={ ()=> this.getNextPage()}/>
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

