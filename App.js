import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ReadStoryScreen from './screens/ReadStoryScreen';
import WriteStoryScreen from './screens/WriteStoryScreen';
import LoginScreen from './screens/LoginScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends React.Component {
    render() {
      return (
        <AppContainer/>
      );
    }
  }
  
  const TabNavigator = createBottomTabNavigator({
    Write: {
      screen: WriteStoryScreen
    },
    Read: {
      screen: ReadStoryScreen
    }
  },
  {
    defaultNavigationOptions: ({navigation})=>({
      tabBarIcon: ()=> {
        const routeName = navigation.state.routeName;
        if(routeName === "Read") {
          return (
            <Image source = {require('./assets/read.png')} style = {{width: 40, height: 40}}/>
          )
        } else if(routeName === "Write") {
          return (
            <Image source = {require('./assets/write.png')} style = {{width: 48, height: 48}}/>
          )
        }
      },
      tabBarOptions:{
        activeTintColor: '#56FEA5',
        inactiveTintColor: 'gray'
      }
    })
  }
  )

  const SwitchNavigator = createSwitchNavigator({
    LoginScreen: {
      screen: LoginScreen
    },
    TabNavigator: {
      screen: TabNavigator
    }
  })
  
  const AppContainer = createAppContainer(SwitchNavigator);