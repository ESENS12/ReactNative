import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions, Animated } from 'react-native';
import Dots from 'react-native-dots-pagination';

const { width } = Dimensions.get('window');

const photos = [
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },
    { uri: 'https://mileung.com/static/media/me.cd114855.png' },
    { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' },


];


export class ScrollViewDotsIndicator extends React.Component {

    _handleScroll = (event) => {

        console.log(parseInt(event.nativeEvent.contentOffset.x/width));
        const currentIndex = parseInt(event.nativeEvent.contentOffset.x/width);
        this.setState({currentpageIndex : currentIndex })
    };


    constructor(props) {
        super(props);

        this.state = {
           currentpageIndex : 0,
        };

    }
    render = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width, height: width }} >
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event)=> { this._handleScroll(event)}}
                        scrollEventThrottle={16}
                    >
                        {photos.map((source, i) => {
                            return (
                                <Image
                                    key={i}
                                    style={{ width, height: width }}
                                    source={source}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'row' , width : width/2, alignItems:'center'}} >
                    <Dots style ={{flex:1}} length={photos.length} width={width/2} active={this.state.currentpageIndex} />
                </View>
            </View>
        );
    }
}
