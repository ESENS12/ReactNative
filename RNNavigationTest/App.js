import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './HomeScreen';
import { ProfileScreen } from './ProfileScreen';

import React  from 'react';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
