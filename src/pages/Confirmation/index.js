import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';

const Confirmation = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Konfirmasi Penarikan"
        subtTitle="Konfirmasi Untuk keamanan transaksi"
        onPress={() => navigation.goBack()}
        onBack
      />
      <View style={styles.container}>
        <TextInput
          label="Password Akun anda"
          placeholder="Isi Password disini"
          secureTextEntry={true}
        />
        <Gap height={20} />
        <Button
          label="Verifikasi"
          onPress={() => navigation.navigate('SuccessConfirmation')}
        />
      </View>
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 19,
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 20,
  },
});
