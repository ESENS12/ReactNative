
import React, {Component} from 'react';
import {Platform, StyleSheet,Button, Text, View} from 'react-native';
import SomethingComponent from "./SomethingComponent";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { isShowing : true };

    this._onPressButton = this._onPressButton.bind(this);
  }


  _onPressButton(){
    console.log("press button!");
    this.setState({ isShowing : !this.state.isShowing });
  }

  render() {

    return (
      <View style={styles.container}>
        { this.state.isShowing && <SomethingComponent style ={styles.instructions}/> }
        <Button style={styles.button} title={"Change State"} onPress={this._onPressButton}/>
      </View>

    );
  }



}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 100,
  },
});
