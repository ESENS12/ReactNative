import React, { Component } from 'react';
import {
    FlatList, StyleSheet,View,

} from 'react-native';

import {Avatar, ListItem} from 'react-native-elements'
import SectionListBasic from './component/SectionListBasic'
import { randomUsers } from './util';
import MyAvatar from "./component/MyAvatar";

export default class App extends Component {


    state = {
        refreshing: false,
        data: randomUsers(20),
        isRounded : false,
    };

    onEndReached = () => {
        this.setState(state => ({
            data: [
                ...state.data,
                ...randomUsers(),
            ]
        }));
    };

    onRefresh = () => {
        this.setState({
            data: randomUsers(20),
        });
        //alert("avatar uri : " + randomUsers(20)[0].avatar);


    };

    render() {
        return (
            {/*<SectionListBasic/>*/},
                <View style={styles.container}>

                    {/** 기본 아바타 사용 **/}

                    {/*<FlatList*/}
                        {/*data={this.state.data}*/}
                        {/*initialNumToRender={20}*/}
                        {/*onEndReachedThreshold={1}*/}
                        {/*onEndReached={this.onEndReached}*/}
                        {/*refreshing={this.state.refreshing}*/}
                        {/*horizontal={true}*/}
                        {/*onRefresh={this.onRefresh}*/}
                        {/*renderItem={({ item }) => {*/}
                            {/*return (*/}
                                {/*<ListItem*/}
                                    {/*roundAvatar*/}
                                    {/*avatar={{uri: item.avatar}}*/}
                                    {/*title={item.name}*/}
                                {/*/>*/}
                            {/*);*/}
                        {/*}}*/}
                    {/*/>*/}

                    {/** 간단한 아바타이지만 커스텀이 어느정도 필요할 때 **/}

                        {/*<FlatList*/}
                            {/*data={this.state.data}*/}
                            {/*initialNumToRender={20}*/}
                            {/*onEndReachedThreshold={1}*/}
                            {/*onEndReached={this.onEndReached}*/}
                            {/*refreshing={this.state.refreshing}*/}
                            {/*// horizontal={true}*/}
                            {/*onRefresh={this.onRefresh}*/}
                            {/*renderItem={({ item }) => {*/}
                                {/*return (*/}
                                    {/*<ListItem*/}
                                        {/*roundAvatar*/}
                                        {/*leftAvatar={<Avatar*/}
                                        {/*source = {{ uri : item.avatar}}/>}*/}
                                        {/*//// not avatar, using leftAvatar..*/}
                                        {/*// leftAvatar={{*/}
                                        {/*//     // size : "small","large", number*/}
                                        {/*//     size : "medium",*/}
                                        {/*//     source: {uri: item.avatar},*/}
                                        {/*//     showEditButton : true,*/}
                                        {/*//     // avatarStyle :styles.avatarStyle,*/}
                                        {/*//*/}
                                        {/*// }}*/}
                                        {/*title={item.name}*/}
                                        {/*containerStyle={styles.itemStyle}*/}
                                    {/*/>*/}
                                {/*);*/}
                            {/*}}*/}
                        {/*/>*/}


                    {/** 커스텀 아바타 사용 방식 **/}
                    <FlatList
                        data={this.state.data}
                        initialNumToRender={20}
                        onEndReachedThreshold={1}
                        onEndReached={this.onEndReached}
                        refreshing={this.state.refreshing}
                        // horizontal={true}
                        onRefresh={this.onRefresh}
                        renderItem={({ item }) => {
                            return (
                                <ListItem
                                    //roundAvatar
                                    // 디폴트 props를 지정해뒀기 떄문에 만약 props에 값을 주는걸 까먹거나 null이나 none이 넘어가도 괜찮다.
                                    leftAvatar={<MyAvatar/>}

                                    //props에 따라 아바타 변경 적용
                                    rightAvatar={<MyAvatar isRounded={false} uri={item.avatar} name={item.name}/>}
                                    title={item.name}
                                    containerStyle={styles.itemStyle}
                                />
                            );
                        }}
                    />
                </View>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },

    avatarStyle:{
        height:200,
        width:200,
    },
    itemStyle:{
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

