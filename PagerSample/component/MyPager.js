import ViewPager from "@react-native-community/viewpager";

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class MyPager extends React.Component {
    render() {
        return (
            <ViewPager
                style={styles.viewPager}
                initialPage={0}>
                <View key="1">
                    <Text>First page</Text>
                    <Text>First page</Text>
                    <Text>First page</Text>
                    <Text>First page</Text>
                </View>
                <View key="2">
                    <Text>Second page</Text>
                </View>
            </ViewPager>
        );
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        backgroundColor:'pink'
    },
});
