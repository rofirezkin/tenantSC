import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DummyIklan, ILEmptyMenu} from '../../assets';
import {
  Button,
  ButtonUploadMenu,
  Gap,
  Header,
  HomeProfile,
  ProfileFoodCourt,
  TabViewHome,
} from '../../components';
import {API_HOST} from '../../config';
import {getFoodData} from '../../redux/action';
import {fonts, getData} from '../../utils';

const Menu = ({navigation, routingData}) => {
  const [userProfile, setUserProfile] = useState('');
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [kodeMenu, setKodeMenu] = useState('');
  const {allFood} = useSelector(state => state.menuReducer);
  useEffect(() => {
    getData('token').then(res => {
      setToken(res.value);
    });
    axios
      .get(`${API_HOST.url}/menu/getKodeMenu`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        setKodeMenu(res.data.data);
      })
      .catch(err => {
        console.log('errr', err);
      });

    getData('userProfile').then(res => {
      setUserProfile(res);
    });
    if (token) {
      dispatch(getFoodData(token));
    }
  }, [token]);

  const dataParams = {
    userProfile,
    token,
    kodeMenu,
  };

  console.log('allldoofr', allFood);
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <HomeProfile />
        <View style={styles.balance}>
          <Text style={styles.label}>Rekening Saya : </Text>
          <Text style={styles.rupiah}>Rp200.000</Text>
        </View>
        {allFood.length < 1 ? (
          <View style={styles.emptymenu}>
            <View>
              <ILEmptyMenu />
            </View>
            <Gap height={30} />
            <Text style={styles.title}>Oopps! tidak ada Menu</Text>
            <Gap height={6} />
            <Text style={styles.subTitle}>Ayo Upload Menu Makanan</Text>
            <Text style={styles.subTitle}>atau minuman untuk mahasiswa</Text>
            <Gap height={30} />
            <View style={styles.buttonContainer}>
              <Button
                label="Upload Menu"
                onPress={() => navigation.navigate('UploadMenu', dataParams)}
              />
            </View>
          </View>
        ) : (
          <View style={styles.boxContent}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.boxIklan}>
                <Gap width={19} />
                <Image source={DummyIklan} style={styles.iklan} />
                <Image source={DummyIklan} style={styles.iklan} />
              </View>
            </ScrollView>
            <View style={styles.button}>
              <Gap height={19} />
              <ButtonUploadMenu
                label="Upload Menu"
                onPress={() => navigation.navigate('UploadMenu', dataParams)}
              />
            </View>
            <View style={{flex: 1}}>
              <TabViewHome />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  balance: {
    paddingHorizontal: 20,
  },
  emptymenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    flex: 1,
  },

  label: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: '#666666',
  },
  rupiah: {
    fontSize: 26,
    color: '#666666',
    fontFamily: fonts.primary[600],
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[400],
    color: '#020202',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
  contianer: {
    backgroundColor: 'white',
    paddingHorizontal: 19,

    paddingTop: 15,
  },
  iklan: {
    width: 295,
    height: 115,
    marginRight: 19,
  },
  boxIklan: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 19,
  },
});
