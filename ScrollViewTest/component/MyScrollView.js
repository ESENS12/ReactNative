import {View, ScrollView, Animated} from 'react-native';
import React ,{PureComponent} from 'react';

export class MyScrollView extends PureComponent {

    state = {
        indicator: new Animated.Value(0),
        wholeHeight: 1,
        visibleHeight: 0
    };

    render() {
        const indicatorSize = this.state.wholeHeight > this.state.visibleHeight ?
            this.state.visibleHeight * this.state.visibleHeight / this.state.wholeHeight :
            this.state.visibleHeight;

        const difference = this.state.visibleHeight > indicatorSize ? this.state.visibleHeight - indicatorSize : 1;
        return (
            <View >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={(width, height) => {
                        this.setState({ wholeHeight: height })
                    }}
                    onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => this.setState({ visibleHeight: height })}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.indicator } } }]
                    )}>


                </ScrollView >
                <View  />
                <Animated.View style={[
                     {
                        height: indicatorSize,
                        transform: [{
                            translateY: Animated.multiply(this.state.indicator, this.state.visibleHeight / this.state.wholeHeight).interpolate({
                                inputRange: [0, difference],
                                outputRange: [0, difference],
                                extrapolate: 'clamp'
                            })
                        }]
                    }]} />

            </View>
        )
    }
}
