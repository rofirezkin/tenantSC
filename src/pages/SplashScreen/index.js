import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LogoSmartCanteen} from '../../assets';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('token').then(res => {
        console.log('token', res);
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
  }, [navigation]);

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
    backgroundColor: '#F05A61',
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
