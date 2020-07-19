import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Geocoder from 'react-native-geocoding';

import {MapScreen} from './Map';
import {WeatherScreen} from './Weather';

import {Config} from '../../environments/environments';
import {Address} from '../shared/interfaces/map';

import {styles} from './styles';

export type TabNavigationParamList = {
  Map: undefined;
  Weather: {address: Address};
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

const App = () => {
  Geocoder.init(Config.GOOGLE_API_KEY, {language: 'en'});
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#824DAD',
            inactiveTintColor: '#B0B0B0',
            labelStyle: styles.label,
            tabStyle: styles.tab,
          }}>
          <Tab.Screen name={'Map'} component={MapScreen} />
          <Tab.Screen name={'Weather'} component={WeatherScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
