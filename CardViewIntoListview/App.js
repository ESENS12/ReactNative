import React, { Component } from 'react';

import{
    Picker,
    ScrollView,
    View,
}from 'react-native';
import {CarouselCardView} from './CarouselCardView';

export default class App extends Component {

  constructor(props){
    super();
    this.state = {
      errors: []
    };
    this.props = props;
    this._carousel = [];
    this.init();
  }

  init(){
    this.state = {
      videos: [
        {
            id : 'id1',
            thumbnails : [
              "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
               "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
                "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",],
        }, {
              id : 'id2',
              thumbnails :  [
                  "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
                  "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
                  "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",],
        }, {
              id : 'id3',
              thumbnails :  [
                  "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
                  "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
                  "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",],
        },
      ]
    };
    // console.log("ThumbnailCarousel Props: ", this.props)
  }

  render = () => {

    console.log("videos: updating");
    // const [videos, setVideos] = useState([]);

    return (

        <View>
            <ScrollView>
                { this.state.videos.map(item => <CarouselCardView {...item} />) }
            </ScrollView>
        </View>
    );
  }
}
