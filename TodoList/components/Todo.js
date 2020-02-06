import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default class Todo extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onClick}
                style={{
                    margin: 10,
                    marginBottom: 0,
                    backgroundColor: "#f9f9f9",
                }}>
                <Text
                    style={{
                        alignSelf:"center",
                        fontSize: 20,
                        textDecorationLine: this.props.completed ? 'line-through' : 'none',
                    }}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}
