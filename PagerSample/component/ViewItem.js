import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class ViewItem extends React.Component {

    static defaultProps = {
        pageIndex : 0
    };

    render() {
        return (
            <View style={styles.viewPager}>
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
