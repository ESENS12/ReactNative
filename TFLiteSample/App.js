/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


// import {ImageClassifier} from './ImageClassifier';
import {TfjsSample} from './TfjsSample';
// import {SampleApp} from './sampleApp';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/*<ImageClassifier/>*/}
        {/*<SampleApp/>*/}
        <TfjsSample/>
      </SafeAreaView>
    </>
  );
};

export default App;
