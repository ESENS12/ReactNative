import {Button,SafeAreaView} from "react-native";
import React  from 'react';

export class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView>
                <Button title="Go to Jane's Home" onPress={() => navigate('Home')} />
                <Button title="Go to Jane's Profile Again" onPress={() => this.props.navigation.push('Profile')} />
                <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
            </SafeAreaView>
        );
    }
}
