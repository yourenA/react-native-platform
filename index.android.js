/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Index from './src/index'
export default class ReactNativePlatform extends Component {
  render() {
    return (
        <Index/>
    );
  }
}


AppRegistry.registerComponent('ReactNativePlatform', () => ReactNativePlatform);
