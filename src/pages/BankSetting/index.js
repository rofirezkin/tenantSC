import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {namaBank} from '../../assets';
import {Gap, Header, Link, Select, TextInput} from '../../components';

const BankSetting = ({navigation}) => {
  const [bankName, setBankName] = useState('');
  const [noRek, setNoRek] = useState('');
  return (
    <View style={styles.page}>
      <Header
        title="Tambah Rekening Bank"
        subtTitle="Pilih bank yang tersedia di aplikasi"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Select
          label="Nama Bank"
          value={bankName}
          onValueChange={value => setBankName(value)}
          selectItem={namaBank}
        />
        <Gap height={18} />
        <TextInput
          placeholder="Isi Nomor Rekening"
          label="Nomor Rekening"
          value={noRek}
          onChangeText={value => setNoRek(value)}
        />
        <Gap height={18} />
        <Link align="center" size={14} title="Verifikasi" />
      </View>
    </View>
  );
};

export default BankSetting;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 19,
    backgroundColor: 'white',
    flex: 1,
  },
});
