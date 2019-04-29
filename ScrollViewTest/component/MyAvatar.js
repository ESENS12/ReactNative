import { Avatar } from 'react-native-elements';
import React , {Component} from "react";

export default class MyAvatar extends Component {

    constructor(props) {
        super(props);
        //this.state = {isRounded : true};
    }

    render() {
        if(this.state.isRounded){
            return (
                <Avatar
                    rounded
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
            );
        }else{
            return (
                <Avatar
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
            );
        }
    }
}


