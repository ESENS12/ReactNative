import {Button} from "react-native";
import React  from 'react';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button title="Go to Jane's profile" onPress={() => navigate('Profile', { name: 'Jane' })} />
        );
    }
}
