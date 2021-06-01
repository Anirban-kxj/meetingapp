
import React from 'react';
import { Image,View, StyleSheet, Button,Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import EnterMeetingDetailsScreen from '../screens/EnterMeetingDetailsScreen';
import ShowMeetingDetailsScreen from '../screens/ShowMeetingDetailsScreen';
import ShowStatScreen from '../screens/ShowStatsScreen';
import Color from '../constants/Color';
import FirstTimeScreen from '../screens/FirstTimeScreen';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { DrawerActions } from 'react-navigation-drawer';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import DrawerContent from '../screens/DrawerContent';

const HomeStack = createStackNavigator();
const MeetingDetailsStack = createStackNavigator();
const StatisticsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor:'#009387'
        },
        headerTintColor:"#fff",
        headerTintStyle:{
            fontWeight:'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Overview',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25}
                backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )        
            }} />    
    </HomeStack.Navigator>
    
);

const MeetingDetailsStackScreen = ({navigation}) => (
    <MeetingDetailsStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor:'#009387'
        },
        headerTintColor:"#fff",
        headerTintStyle:{
            fontWeight:'bold'
        }
    }}>        
        <MeetingDetailsStack.Screen name="MeetingDetails" component={EnterMeetingDetailsScreen} options={{
            title:'Dashboard',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25}
                backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )        
            }} />        
    </MeetingDetailsStack.Navigator>
);

const StatisticsStackScreen = ({navigation}) => (
    <StatisticsStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor:'#009387'
        },
        headerTintColor:"#fff",
        headerTintStyle:{
            fontWeight:'bold'
        }
    }}>
        <StatisticsStack.Screen name="Statistics" component={ShowStatScreen} options={{
            title:'Analytics',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25}
                backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )        
            }} />
    </StatisticsStack.Navigator>
);

const JournalNavigator = () => {
    return (               
        // <Drawer.Navigator initialRouteName="Home" drawerContent={props=> <DrawerContent {...props} />} >
        <Drawer.Navigator drawerContent={props=> <DrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Dashboard" component={MeetingDetailsStackScreen} />
            <Drawer.Screen name="Analytics" component={StatisticsStackScreen} />
        </Drawer.Navigator>
    );
}

export default JournalNavigator;