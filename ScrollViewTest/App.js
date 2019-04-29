import React, { Component } from 'react';
import {
    FlatList, StyleSheet,View,

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
            {/*<SectionListBasic/>*/},
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        initialNumToRender={20}
                        onEndReachedThreshold={1}
                        onEndReached={this.onEndReached}
                        refreshing={this.state.refreshing}
                        horizontal={true}
                        onRefresh={this.onRefresh}
                        renderItem={({ item }) => {
                            return (
                                <ListItem
                                    roundAvatar
                                    avatar={{uri: item.avatar}}
                                    title={item.name}
                                />
                            );
                        }}
                    />
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
                                        roundAvatar
                                        avatar={{uri: item.avatar}}
                                        title={item.name}
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

