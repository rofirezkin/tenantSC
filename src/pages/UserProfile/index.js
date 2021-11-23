import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Gap,
  Header,
  ItemValue,
  ProfileFoodCourt,
} from '../../components';
import {fonts, getData} from '../../utils';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    getData('userProfile').then(res => {
      setProfile(res);
    });
    getData('token').then(res => {
      setToken(res.value);
    });
  }, []);
  const data = {
    userProfile: profile,
    token: token,
  };
  return (
    <View style={styles.page}>
      <Header
        title="Akun Anda"
        onBack
        subtTitle="Lihat detail akun anda"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ProfileFoodCourt />
        <Gap height={20} />
        <Text style={styles.title}>Profile Tenant</Text>
        <ItemValue profile title="ID Tenant" value={`: ${profile.id_tenant}`} />
        <ItemValue
          profile
          title="Nama Pemilik"
          value={`: ${profile.nama_pemilik}`}
        />
        <ItemValue profile title="Nomor Hp" value={`: ${profile.no_telp}`} />
        <ItemValue
          profile
          title="Nama Kantin"
          value={`: ${profile.nama_tenant}`}
        />
        <ItemValue
          profile
          title="Lokasi Kantin Anda"
          value={`: ${profile.lokasi_kantin}`}
        />
        <ItemValue
          profile
          title="Rekening Bank"
          value={`: (${profile.nama_bank}) ${profile.no_rekening}`}
        />
      </View>
      <View style={styles.button}>
        <Button
          label="Edit Profie"
          onPress={() => navigation.navigate('EditProfile', data)}
        />
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingHorizontal: 19,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: fonts.primary[500],
  },
  button: {
    marginTop: 15,
    paddingHorizontal: 19,
  },
});
