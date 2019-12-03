import React, {useState, Component } from 'react';

import styled from "styled-components/native"; // 3.1.6
import Carousel from 'react-native-snap-carousel'; // 3.6.0

import{
    ScrollView,
    View,
}from 'react-native';
import {CarouselCardView} from './CarouselCardView';

const Item = ( props ) => {
    //
    // if (props.isFake) {
    //     return null
    // }
    console.log("props : " + props);
    console.log("index : " + props.index);

    return (
        <CarouselBackgroundView>
            <Carousel
                ref={'carousel'}
                data={props}
                renderItem={this.refs['carousel']._renderItem(this)}
                sliderWidth={360}
                itemWidth={256}
                layout={'default'}
                firstItem={0}
            />
        </CarouselBackgroundView>
    )
};



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
            thumbnails : [
              "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
               "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
                "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",],
        }, {
              thumbnails :  [
                  "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
                  "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
                  "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",],
        }, {
              thumbnails :  [
                  "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
                  "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
                  "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",],
        },
      ]
    };
    // console.log("ThumbnailCarousel Props: ", this.props)
  }

  handleSnapToItem(index){
    console.log("snapped to ", index)
  }

  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item);
    return (
        <ThumbnailBackgroundView>
          <CurrentVideoTO
              onPress={ () => {
                console.log("clicked to index", index);
                this._carousel.snapToItem(index);
              }}
          >
            <CurrentVideoImage source={{ uri: item.thumbnails[0] }} />
          </CurrentVideoTO>
          {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
          {/*<VideoTitleText>{item.title}</VideoTitleText>*/}
        </ThumbnailBackgroundView>
    );
  };

  render = () => {

    console.log("videos: updating");
    // const [videos, setVideos] = useState([]);

    return (

        <View>
            <ScrollView>

                <CarouselBackgroundView>
                    <Carousel
                        ref={ (c) => { this._carousel = c; } }
                        data={this.state.videos}
                        renderItem={this._renderItem.bind(this)}
                        onSnapToItem={this.handleSnapToItem.bind(this)}
                        sliderWidth={360}
                        itemWidth={256}
                        layout={'default'}
                        firstItem={0}
                    />
                </CarouselBackgroundView>

                <CarouselBackgroundView>
                    <Carousel
                        ref={ (c) => { this._carousel = c; } }
                        data={this.state.videos}
                        renderItem={this._renderItem.bind(this)}
                        onSnapToItem={this.handleSnapToItem.bind(this)}
                        sliderWidth={360}
                        itemWidth={256}
                        layout={'default'}
                        firstItem={0}
                    />
                </CarouselBackgroundView>

                {/*{ this.state.videos.map(item => <CarouselCardView {...item} />) }*/}
            </ScrollView>


        </View>
    );
  }
}


const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`;

const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256; 
`;

const CurrentVideoTO = styled.TouchableOpacity`
`;

const CarouselBackgroundView = styled.View`
  background-color: black;
  height: 200;
  width: 100%;
`;

