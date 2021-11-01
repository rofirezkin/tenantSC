import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Gap,
  Header,
  ItemValue,
  ProfileFoodCourt,
} from '../../components';
import {fonts} from '../../utils';

const UserProfile = ({navigation}) => {
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
        <ItemValue title="ID Tenant" value=": A-01" />
        <ItemValue title="Nama Pemilik" value=": Syarif Hidayat" />
        <ItemValue title="Nomor Hp" value=": 086773221444" />
        <ItemValue title="Nama Kantin" value=": Soto Madura" />
        <ItemValue title="Lokasi Kantin Anda" value=": Fakultas Teknik" />
        <ItemValue title="Rekening Bank" value=": (Mandiri) 012454959933" />
      </View>
      <View style={styles.button}>
        <Button
          label="Edit Profie"
          onPress={() => navigation.navigate('EditProfile')}
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
