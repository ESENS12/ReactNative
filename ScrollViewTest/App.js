import React, { Component } from 'react';
import {
    FlatList,

} from 'react-native';

import {ListItem } from 'react-native-elements'
import SectionListBasic from './component/SectionListBasic'
import { randomUsers } from './util';

export default class App extends Component {
    state = {
        refreshing: false,
        data: randomUsers(20),
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
    };

    render() {
        return (
            <SectionListBasic/>
                // <FlatList
                //     data={this.state.data}
                //     initialNumToRender={20}
                //     onEndReachedThreshold={1}
                //     onEndReached={this.onEndReached}
                //     refreshing={this.state.refreshing}
                //     onRefresh={this.onRefresh}
                //     renderItem={({ item }) => {
                //         return (
                //             <ListItem
                //                 roundAvatar
                //                 avatar={{uri: item.avatar}}
                //                 title={item.name}
                //             />
                //         );
                //     }}
                // />
        );
    }
}

