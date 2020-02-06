import React, { Component } from 'react';
import {View} from 'react-native';
import Todo from './Todo';
import { FlatList } from 'react-native';
import {black} from 'color-name';

export default class TodoList extends Component {


    separatorFlatList = () =>{
        return(
            <View style={{ alignSelf: "center",height:1, width:"95%", backgroundColor:"green"}}/>
        );
    };

    render() {
        return (
            <FlatList
                style={{overflow:'hidden' , marginBottom:10}}
                data={this.props.todos}
                ItemSeparatorComponent={this.separatorFlatList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>
                    <Todo {...item}
                          onClick={() => {this.props.onTodoClick(index)}} />}
            />
        );
    }
}
