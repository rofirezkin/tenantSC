import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, ItemListMenu, List, ProfileFoodCourt} from '../../components';

const Profile = ({navigation}) => {
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
          <List name="Log Out" desc="Keluar dari akun anda" icon="logout" />
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
