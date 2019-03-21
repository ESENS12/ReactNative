import React, {Component} from 'react';
import {StyleSheet, Button, View} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
  }


  render() {
    return (

        <View style={styles.container}>
          <View style={styles.topView }/>
          <View style={styles.containerBox}/>
          <View style={styles.bottomView}/>
        </View>
    );
  }
}
const styles = StyleSheet.create({

  container: {
    flex: 5,
    backgroundColor: 'green' ,
  },
  topView: {
    flex: 2.5,
    backgroundColor: 'red' ,
  },
  containerBox: {
    flex:1,
    backgroundColor: 'white',
  },
  bottomView:{
    flex:2.5,
    backgroundColor: 'blue' ,
  }

});
