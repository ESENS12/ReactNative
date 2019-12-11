import {Button,View,SafeAreaView} from "react-native";
import React  from 'react';
import { NavigationEvents } from 'react-navigation';
;

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    componentDidMount(){
        // this.load();
        this.props.navigation.addListener('willFocus', this.willFocus);
        this.props.navigation.addListener('didFocus',this.didFocus);
        this.props.navigation.addListener('willBlur',this.willBlur);
        this.props.navigation.addListener('didBlur',this.didBlur);
    }

    willFocus = () => {
      console.log("willFocus HomeScreen!");
    };

    didFocus = ()=> {
        console.log("didFocus HomeScreen")
    };

    willBlur = ()=> {
        console.log("willBlur HomeScreen")
    };

    didBlur = ()=> {
        console.log("didBlur HomeScreen")
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView>

                <Button title="Go to Jane's profile" onPress={() => navigate('Profile')} />

            </SafeAreaView>
        );
    }
}
