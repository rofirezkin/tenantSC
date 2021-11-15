import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {BottomNavigator} from '../components';
import {
  BukaTutupKantin,
  Cashout,
  CashoutNominal,
  Confirmation,
  CostumerOrder,
  DetailCashout,
  EditMenu,
  EditProfile,
  HelpCenter,
  History,
  Menu,
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
const Tab = createBottomTabNavigator();

const MainApp = ({route}) => {
  const routingData = route.params;

  return (
    <Tab.Navigator
      initialRouteName={routingData}
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        initialParams={{getToken: routingData}}
        name="Menu"
        component={Menu}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CostumerOrder"
        component={CostumerOrder}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
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
        name="Withdraw"
        component={Withdraw}
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
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
