import React, {useEffect, useState} from 'react';
import NotifService from '../../utils/notification/NotifService';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {LogoSmartCanteen} from '../../assets';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('token').then(res => {
        if (res) {
          const token = res.value;
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp', params: {token}}],
          });
        } else {
          navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
        }
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.page}>
      <Image source={LogoSmartCanteen} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ED212B',
  },
  text: {
    color: 'white',
    fontSize: 23,
    fontFamily: 'Poppins-Medium',
  },
  logo: {
    width: 215,
    height: 86,
  },
});
