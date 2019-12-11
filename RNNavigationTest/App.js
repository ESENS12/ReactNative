import {createAppContainer, NavigationEvents} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { HomeScreen } from './HomeScreen';
import { ProfileScreen } from './ProfileScreen';

import React  from 'react';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions:{
      title:'Home',
      headerBackTitle: 'Back',
      gesturesEnabled : false,
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions:{
      gesturesEnabled : false,
    }
  },
});


const DrawerNavigator = createDrawerNavigator({
  Home: { //Title
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: "HomeScreen"
    }
  },
  Profile: {//Title
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: "Profile"
    }
  },

});

const App = createAppContainer(MainNavigator);
// const App = createAppContainer(DrawerNavigator);

export default App;
