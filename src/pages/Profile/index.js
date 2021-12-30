import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header, ItemListMenu, List, ProfileFoodCourt} from '../../components';
import {API_HOST} from '../../config';
import {setLoading} from '../../redux/action';
import {getData, showMessage} from '../../utils';

const Profile = ({navigation}) => {
  const {isLoading} = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  useEffect(() => {
    getData('token').then(res => {
      setToken(res.value);
    });
  }, []);

  const signOut = () => {
    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/tenant/logout`, token, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
          navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
        });
        dispatch(setLoading(false));
      })
      .catch(err => {
        showMessage(err?.message);
        dispatch(setLoading(false));
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Akun Saya" subtTitle="Pengaturan Akun Tenant" />
      <View style={styles.container}>
        <ProfileFoodCourt />
        <View style={styles.cardBox}>
          <List
            icon="edit-profile"
            name="Data Akun anda"
            desc="Lihat dan edit akun anda"
            onPress={() => navigation.navigate('UserProfile')}
          />
          {/* <List
            icon="bank"
            name="Akun Bank"
            desc="Lihat akun bank anda"
            onPress={() => navigation.navigate('BankSetting')}
          /> */}
          <List
            icon="tutup-buka"
            name="Buka/Tutup kantin"
            desc="Atur Status kantin"
            onPress={() => navigation.navigate('BukaTutupKantin')}
          />
          <List
            name="Bantuan Admin"
            desc="Hubungi admin jika ada masalah"
            icon="bantuan"
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <List
            onPress={signOut}
            name="Log Out"
            desc="Keluar dari akun anda"
            icon="logout"
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 19,
    paddingTop: 19,
  },
  cardBox: {
    marginTop: 20,
  },
});
