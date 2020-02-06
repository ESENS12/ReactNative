import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import {blue, white} from 'color-name';

/**
 *  ADD TODO COMPONENT
 *
 * */
export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40 , marginHorizontal:15,textAlign: 'center', borderColor: 'gray', borderWidth: 1}}
                    placeholder="Eg. Make shit as usually"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text} />
                <Button
                    title="Add"
                    onPress={(e) => this.handleClick(e)} />
            </View>
        )
    }

    handleClick(e) {

        const text = this.state.text.trim();

        if(text.length > 0){
            //props로 전달받은 AddClick에 넘겨줌
            this.props.onAddClick(text);
            this.setState({text: ""});
        }else{
            alert('Typo Something dumb ass');
        }

    }
}
