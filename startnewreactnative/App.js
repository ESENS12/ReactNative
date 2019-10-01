/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.aligntest1}>
        <Text>Hello</Text>
      </View>
      <Text style={styles.text}>Hello React</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  aligntest1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  text: {
    color: 'black',
  },
});
