import React, { useState ,Component } from 'react';

import styled from "styled-components/native"; // 3.1.6
import Carousel from 'react-native-snap-carousel';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen'; // 3.6.0

export class CarouselCardView extends Component {

    constructor(props){
        super(props);

        console.log("CarouselCardView Render : " ,props.title);

        // console.log('props' +  props);

        this.state = {
            errors: [],
            props : [],
        };

        this.props = props;

        this._carousel = {};
        this.init();

        this._renderItem = this._renderItem.bind(this);

    }

    componentDidMount(): void {
        console.log('componentDidMount')
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log('componentDidUpdate : ');
    }


    init(){

        // console.log("Carousel init Props: ", this.props.title)
        // console.log("Carousel init Props: ", this.props.imgList[0])
    }

    handleSnapToItem(index){
        // console.log("item : ", this.props.title ,"snapped to ", index)
    }

    _renderItem = ( {item, index} ) => {
        // console.log('renderItem ' + item);
        return (
            <ThumbnailBackgroundView>
                <CurrentVideoTO
                    onPress={ () => {
                        console.log("clicked to index", index);
                        this._carousel.snapToItem(index);
                    }}
                >
                    <CurrentVideoImage source={{ uri: this.props.imgList[index] }} />
                </CurrentVideoTO>
                {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
                <VideoTitleText>{index}</VideoTitleText>
            </ThumbnailBackgroundView>
        );
    };

    render = () => {
        try {
            if (this.props !== null) {
                return (
                    <TouchableOpacity onPress={this.props.onPress} style={styles.listItemParent}>
                        {/*<Text style={styles.listItemText}> {props.index} </Text>*/}
                        <Text style={styles.listItemText}> {this.props.title} </Text>
                        <Text style={styles.listItemURL}> {this.props.url} </Text>
                        <CarouselBackgroundView>
                            <Carousel
                                // ref={(c) => {
                                //     this._carousel = c;
                                // }}
                                ref={'carousel'}
                                data={this.props.imgList}
                                renderItem={this._renderItem.bind(this.props)}
                                onSnapToItem={this.handleSnapToItem.bind(this)}
                                sliderWidth={360}
                                itemWidth={256}
                                layout={'default'}
                                firstItem={0}
                            />
                        </CarouselBackgroundView>

                        {/*<Text>{props.lead}</Text>*/}
                    </TouchableOpacity>

                    // <CarouselBackgroundView>
                    //     <Carousel
                    //         ref={ (c) => { this._carousel = c; } }
                    //         data={this.props.imgList}
                    //         renderItem={this._renderItem.bind(this.props)}
                    //         onSnapToItem={this.handleSnapToItem.bind(this)}
                    //         sliderWidth={360}
                    //         itemWidth={256}
                    //         layout={'default'}
                    //         firstItem={0}
                    //     />
                    // </CarouselBackgroundView>
                );
            } else {
                return null;
            }
        }catch (e) {
            console.log("exception: " + e.toString());
            return null
        }
    }

}


const styles = StyleSheet.create({

    /**
     *    search query layout
     *
     * */
    searchQueryParent:{
        marginTop : 45,
        flexDirection : 'row',
        backgroundColor: Colors.primary,
    },

    //검색어 editText
    searchQueryTextInput: {
        marginLeft : 10,
        fontSize : 20,
        flex: 1,
        textAlign : 'center',
        alignItems : 'flex-end',
        backgroundColor: Colors.white,
        color: Colors.dark,
    },

    //검색어 textview
    searchQueryDescription: {
        marginLeft : 10,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.white,
    },

    /**
     *
     * listitem layout
     *
     * **/

    listItemParent:{
        margin : 10,
        backgroundColor: Colors.light,
        flexDirection: 'column'
    },

    listItemText:{
        flex:1,
        fontSize : 20,
        color : Colors.black,
    },

    listItemURL:{
        flex:1,
        fontSize : 20,
        color : Colors.primary,
    },

    scrollView: {
        backgroundColor: Colors.lighter,
    },

    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    container:{
        flex : 1,
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
