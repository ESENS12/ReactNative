import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>

          <View style={styles.imgWrapper}>

            <Image
                style={styles.img}
                source={{
                  uri: 'https://static.pexels.com/photos/23049/pexels-photo.jpg',
                }}
            />
            <View style={styles.imgOver}>
              <Text style={styles.text}>Something</Text>
            </View>

          </View>

        </View>
    );
  }
}

const width = 150,
    height = 150,
    borders = {
      tl: 80,
      tr: 80,
      bl: 80,
      br: 80,
    };

const baseStyle = {
  width: width,
  height: height,
  borderTopLeftRadius: borders.tl,
  borderTopRightRadius: borders.tr,
  borderBottomLeftRadius: borders.bl,
  borderBottomRightRadius: borders.br,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color:'white',
    fontSize:34
  },
  img: baseStyle,
  imgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    ...baseStyle,
  },
  imgOver: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
    position: 'absolute',
    backgroundColor: 'transparent',
    ...baseStyle,
  },
});
