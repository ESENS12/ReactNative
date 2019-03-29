
import React, {Component} from 'react';
import {TouchableHighlight ,TouchableOpacity,Platform, Button ,StyleSheet, Text, View} from 'react-native';


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

   //this.state = { isEnable : true };
    //state와 listener의 context가 다르기때문에 반드시 생성자에서 bind 해줘야함
    //this.callbackListener = this.callbackListener.bind(this);
    //this.isEnableFirstTBTListener = this.isEnableFirstTBTListener.bind(this);
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

        <TouchableHighlight onPress={() => this._onClick('left')} style ={styles.leftSide}>
          <Text>leftSide</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

// alignItems -> flex-start,center, flex-end, stretch
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
