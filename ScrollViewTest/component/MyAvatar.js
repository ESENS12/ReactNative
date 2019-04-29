import { Avatar } from 'react-native-elements';
import React , {Component} from "react";
import {StyleSheet} from "react-native";

export default class MyAvatar extends Component {

    static defaultProps = {
        isRounded : true,
        //보통 디폴트 uri 는 unknown image resources 나.. basic icon image 를 지정해서 정해둬야겠지
        uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        name : 'unknown'
    };

    constructor(props) {
        super(props);
        // this.state = { isRounded : true };
        // this.isRounded = this.isRounded.bind(this);
    }

    // isRounded = (value) =>
        // this.setState({isRounded : value});


    //props의 차이에 따라서 다르게 표현되도록 컴포넌트 조건부 리턴
    render() {
        if(this.props.isRounded){
            return (
                <Avatar
                    rounded
                    title={this.props.name}
                    source={{
                        uri: this.props.uri,
                    }}
                />
            );
        }else{
            return (
                <Avatar
                    title={this.props.name}
                    source={{
                        uri: this.props.uri,
                    }}
                    avatarStyle={styles.avatarStyle}
                    containerStyle={styles.containerStyle}
                    //컨테이너가 아바타 보다 크게 잡힌 경우 남은 공간에 style을 줄 수 있다.(아바타에 여백을 주던가 컨테이너가 크던가..
                    overlayContainerStyle={{backgroundColor:'blue'}}
                />
            );
        }
    }
}


const styles = StyleSheet.create({

    containerStyle:{
        height: 70,
        width:  70,
    },

    //avatarStyle은 컨테이너 내부 순수 이미지 스타일이라고 생각하면 됨
    avatarStyle:{
        flex :1,
        margin : 3,
    },

});



