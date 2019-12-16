
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';

let isHidden = true;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(200),  //This is the initial position of the subview
      buttonText: "Up Subview"
    };
  }

  _toggleSubview() {
    console.log('_toggleSubview()');
    this.setState({
      buttonText: !isHidden ? "Up Subview" : "Down Subview"
    });

    let toValue = 200;

    if(isHidden) {
      toValue = 150;
    }

    Animated.spring(
        this.state.bounceValue,
        {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
        }
    ).start(()=>{console.log("animEnd")});

    isHidden = !isHidden;
  }


  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={ ()=> this._toggleSubview()} >
              <Text style={styles.buttonText}>{this.state.buttonText}</Text>
            </TouchableOpacity>
            <Animated.View
                style={[styles.subView,
                  {transform: [{translateY: this.state.bounceValue}]}]}
            >
              <Text style={styles.BottomViewText}>This is a sub view</Text>
            </Animated.View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop:100,
  },
  button: {
    height:100,
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  BottomViewText: {
    fontSize: 17,
    color:"#fff",
    textAlign:"center",
    backgroundColor:"#000"
  },
  searchBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 100,
    alignSelf: 'stretch',

    // backgroundColor:'#03d05e',
    textAlignVertical: 'center',
  },
  subView: {
    flex:1,
    alignSelf:'flex-end',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 100,
  }
});
