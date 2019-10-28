
import React, {Component} from 'react';
import {TouchableHighlight ,TouchableOpacity,Platform, Button ,StyleSheet, Text, View} from 'react-native';
import WhateverComponent from './WhateverComponent';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    //state와 listener의 context가 다르기때문에 반드시 생성자에서 bind 해줘야함
    this._onClick = this._onClick.bind(this);
  }

  _onClick(number){
    console.log("number is : " + number);
  }

  render() {
    return (

      <View style={styles.container}>

        <TouchableOpacity onPress={() => this._onClick(1)} style={styles.topView}>
          <Text>topView</Text>
        </TouchableOpacity>

        <TouchableHighlight onPress={() => this._onClick(2)} style={styles.content}>
          <Text>Content</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._onClick(3)} style={styles.bottomView}>
          <Text>bottomView</Text>
        </TouchableHighlight>

          {/*<WhateverComponent />*/}

        <TouchableHighlight onPress={() => this._onClick('left')} style ={styles.leftSide}>
          <Text>leftSide</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

// alignItems -> flex-start, center, flex-end, stretch
// justifyContent -> flex-start, center, flex-end, space-around, space-between, space-evenly
// flexDirection -> row , column


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  topView : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  content : {
    flex : 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  bottomView : {
    flex : 1,
    //zIndex가 높은 순서대로 위에 표시된다, zIndex가 없거나, 같은값일때는 가장 아래쪽 view가 최상단에 표출된다.
    zIndex : 2 ,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },

  leftSide:{
    //absolute를 주면 오버레이가 가능함
    position: 'absolute',
    //zIndex가 높은 순서대로 위에 표시된다.
    zIndex : 1 ,
    flex: 1,
    left : 0,
    top : 0,
    bottom: 0,
    right:"80%",
    justifyContent : 'center',
    alignSelf: 'stretch',
    backgroundColor : 'red',
  },
});
