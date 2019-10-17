import React from 'react';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

import { Text, View, StyleSheet, TextInput, Button, Header } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { StackNavigator } from 'react-navigation';
import hienThi from './hienThi';
import them from './them';
import sua from './sua';


const MainNavigator = createStackNavigator({
  hienThi: hienThi,
  them:them,
  sua:sua,
}, {initialRouteName:'hienThi'});

const App = createAppContainer(MainNavigator);

export default App;
