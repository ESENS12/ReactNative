import {createAppContainer, NavigationEvents} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MyWebview } from './Component/MyWebview';
import { MainPage } from './MainPage';



import React  from 'react';

const MainNavigator = createStackNavigator({
  MainPage: {
    screen: MainPage,
  },
  MyWebview: {
    screen: MyWebview,
  },
});

const App = createAppContainer(MainNavigator);

export default App;
