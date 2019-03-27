/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux'
import Root from './containers/Root'
import initStore from './store';

const store = initStore();

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Root />
        </Provider>
    );
  }
}