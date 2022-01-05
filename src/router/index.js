import Icon from 'react-native-vector-icons/FontAwesome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {IcMenuOn} from '../assets';
import {BottomNavigator} from '../components';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  BankSetting,
  BukaTutupKantin,
  Cashout,
  Confirmation,
  CostumerOrder,
  DetailCashout,
  EditMenu,
  EditProfile,
  HelpCenter,
  History,
  Maintenance,
  Menu,
  Notification,
  Profile,
  SignIn,
  SignUp,
  SignUpCanteen,
  SplashScreen,
  StatusTransfer,
  SuccessConfirmation,
  SuccessSignUp,
  UploadMenu,
  UserProfile,
  Withdraw,
} from '../pages';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainApp = ({route}) => {
  return (
    <Tab.Navigator
      activeColor="#ED212B"
      barStyle={{backgroundColor: 'white'}}
      // tabBar={props => <BottomNavigator {...props} />}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="CostumerOrder"
        component={CostumerOrder}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Maintenance"
        component={History}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({color}) => (
            <Icon name="exchange" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color}) => <Icon name="cog" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Maintenance"
        component={Maintenance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Withdraw"
        component={Withdraw}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditMenu"
        component={EditMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BukaTutupKantin"
        component={BukaTutupKantin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadMenu"
        component={UploadMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CostumerOrder"
        component={CostumerOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailCashout"
        component={DetailCashout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cashout"
        component={Cashout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpCanteen"
        component={SignUpCanteen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessConfirmation"
        component={SuccessConfirmation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatusTransfer"
        component={StatusTransfer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BankSetting"
        component={BankSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
