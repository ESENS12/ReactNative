
import React , {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import { useCameraRoll } from 'react-native-hooks'

import { GetAlbum,GetPhoto } from './CameraRoll'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export default class App extends Component {

  requestCameraPermission = async () =>{
    try {
      console.log("requestCameraPermission");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }

    } catch (err) {
      console.warn("error! : "+err);
    }
  };


  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestCameraPermission();
      console.log('this is Android device');
    } else {
      console.log('this is iOS device');
      // this.getLocation();
    }
  }


  render(){
    return (
        <>
          <StatusBar barStyle="dark-content" />
          <View style={styles.sectionContainer}>
            {/*<Button title='Get Photos' onPress={() => getAlbum()}>Get Photos</Button>*/}
            {/*<GetPhoto/>*/}
            <GetAlbum/>
          </View>
        </>
    );
  }
  // }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  text:{
    color: Colors.dark,
    fontSize: 12,
    marginTop : 100,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    backgroundColor: Colors.white,
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
