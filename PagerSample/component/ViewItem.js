import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import style from './ViewPagerPage'

export default class ViewItem extends React.Component {

    static defaultProps = {
        pageIndex : 0,
    };

    render() {

        const style = require('./styles');
        // 글로벌 스타일을 각 페이지별로 (같은 컴포넌트일때) 적용하려면 statement로 하던가..redux를 쓰던가..
        return (
            <View style={this.props.background}>
                <Text style={styles.textView}>{this.props.pageIndex}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        justifyContent:'center',
        alignContent:'stretch',
        backgroundColor:'skyblue',
    },
    textView :{
        alignSelf : 'center'
    },

});
