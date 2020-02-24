import {createAppContainer, NavigationEvents} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './HomeScreen';
import { ProfileScreen } from './ProfileScreen';
import {Button,View,Text} from "react-native";
import React  from 'react';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
});


const RootStack = createStackNavigator(
    {
      Main: {
        screen: MainNavigator,
      },
      MyModal: {
        screen: ModalScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
);

class ModalScreen extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Button
              onPress={() => this.props.navigation.goBack()}
              title="Dismiss"
          />
        </View>
    );
  }
}

const App = createAppContainer(RootStack);
// const App = createAppContainer(DrawerNavigator);

export default App;
