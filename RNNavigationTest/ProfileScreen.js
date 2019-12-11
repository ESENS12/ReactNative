import {Button} from "react-native";
import React  from 'react';

export class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Hello',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button title="Go to Jane's Home" onPress={() => navigate('Home', { name: 'Jane' })} />
        );
    }
}
