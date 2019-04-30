import {StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import ViewItem from "./ViewItem";

export default class ViewPagerPage extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                {/*<IndicatorViewPager*/}
                    {/*style={{height:200}}*/}
                    {/*indicator={this._renderDotIndicator()}*/}
                {/*>*/}
                    {/*<View style={{backgroundColor:'cadetblue'}}>*/}
                        {/*<Text>page one</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'cornflowerblue'}}>*/}
                        {/*<Text>page two</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'#1AA094'}}>*/}
                        {/*<Text>page three</Text>*/}
                    {/*</View>*/}
                {/*</IndicatorViewPager>*/}

                {/*<IndicatorViewPager*/}
                    {/*style={{flex:1, paddingTop:20, backgroundColor:'white'}}*/}
                    {/*indicator={this._renderTitleIndicator()}*/}
                {/*>*/}
                    {/*<View style={{backgroundColor:'cadetblue'}}>*/}
                        {/*<Text>page one</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'cornflowerblue'}}>*/}
                        {/*<Text>page two</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'#1AA094'}}>*/}
                        {/*<Text>page three</Text>*/}
                    {/*</View>*/}
                {/*</IndicatorViewPager>*/}

                {/*<IndicatorViewPager*/}
                    {/*style={{flex:1, paddingTop:20, backgroundColor:'white'}}*/}
                    {/*indicator={this._renderTabIndicator()}*/}
                {/*>*/}
                    {/*<View style={{backgroundColor:'cadetblue'}}>*/}
                        {/*<Text>page one</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'cornflowerblue'}}>*/}
                        {/*<Text>page two</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'#1AA094'}}>*/}
                        {/*<Text>page three</Text>*/}
                    {/*</View>*/}
                {/*</IndicatorViewPager>*/}

                <IndicatorViewPager
                    style={{flex:1, marginBottom:50, backgroundColor:'white'}}
                    indicator={this._renderTabIndicator()}
                >
                    <View>
                        <ViewItem pageIndex ={1} />
                    </View>
                    <View>
                        <ViewItem pageIndex ={2} />
                    </View>
                    <View>
                        <ViewItem pageIndex ={3} />
                    </View>

                </IndicatorViewPager>
            </View>
        );
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }

    _renderTabIndicator() {
        let tabs = [{
            text: 'Home',
            //iconSource: require('../imgs/ic_tab_home_normal.png'),
            // selectedIconSource: require('../imgs/ic_tab_home_click.png')
        },{
            text: 'Message',
            //iconSource: require('../imgs/ic_tab_task_normal.png'),
            //selectedIconSource: require('../imgs/ic_tab_task_click.png')
        },{
            text: 'Profile',
            //iconSource: require('../imgs/ic_tab_my_normal.png'),
            //selectedIconSource: require('../imgs/ic_tab_my_click.png')
        }];
        return <PagerTabIndicator tabs={tabs} />;
    }

}