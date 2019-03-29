import React from 'react'
import { Image ,StyleSheet ,  Text, View,DeviceEventEmitter } from 'react-native'

export default class SomethingComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log("somthing Component Props : " + props.toString());

        this.state = { CurrentFirstTbTIndex: 0 , isEnableTBT : true };

        //state와 listener의 context가 다르기때문에 반드시 생성자에서 bind 해줘야함

        this.callbackListener = this.callbackListener.bind(this);


    }

    componentDidMount(): void {
        //listener 등록(eventType이 native의 eventName 과 동일해야함)
        DeviceEventEmitter.addListener('something_event', this.callbackListener);
    }


    callbackListener(e : event){
        //이벤트 발생 시 state 업데이트
        this.setState({ CurrentFirstTbTIndex : e , isEnableTBT : false });
        //android의 경우 fatosRNPackager에서 NativeModule 내부에 각 네이티브 컴포넌트들을 등록하기 때문에 아래와 같이 호출하여 사용 가능
        //android native에 리소스 업데이트 되었다고 전달
        //NativeModules.FatosToastModule.show("resource update");

    }

    render () {
        return (
            <View style ={styles.container}>
                <Text> Something Text, I hope this is blink when update props</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginRight: 10,

    },
    testStyle : {
        textAlign: 'center',
        fontSize : 10,
    }
});