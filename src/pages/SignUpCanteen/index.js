import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, Select, TextInput} from '../../components';
import useForm from '../../utils/useForm';
import {useDispatch, useSelector} from 'react-redux';
import {lokasiKantin, namaBank} from '../../assets';
import {setLoading, signUpAction} from '../../redux/action';
import axios from 'axios';
import {API_HOST} from '../../config';

const SignUpCanteen = ({navigation}) => {
  const [form, setForm] = useForm({
    nama_tenant: '',
    no_telp: '',
    lokasi_kantin: 'Fakultas Ilmu Terapan',
    nama_bank: 'Mandiri',
    nama_rekening: '',
    no_rekening: '',
    status: 'Buka',
    is_active: '1',
  });

  const dispatch = useDispatch();
  const {registerReducer, photoReducer} = useSelector(state => state);

  const onSubmit = () => {
    const data = {
      ...form,
      ...registerReducer,
    };

    dispatch(setLoading(true));
    dispatch(signUpAction(data, photoReducer, navigation));
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <Header
          title="Detail Kantin"
          onPress={() => navigation.goBack()}
          subtTitle="Testing Signup"
          onBack
        />
        <View style={styles.container}>
          <Gap height={16} />
          <TextInput
            label="Nomor HP/ WA"
            placeholder="Isi nomor hp anda disini"
            value={form.no_telp}
            onChangeText={value => setForm('no_telp', value)}
            keyboardType="numeric"
          />
          <Gap height={16} />
          <Select
            value={form.lokasi_kantin}
            onValueChange={value => setForm('lokasi_kantin', value)}
            selectItem={lokasiKantin}
            label="Lokasi Kantin"
          />
          <Gap height={16} />
          <Select
            label="Nama Bank"
            value={form.nama_bank}
            onValueChange={value => setForm('nama_bank', value)}
            selectItem={namaBank}
          />
          <Gap height={16} />
          <TextInput
            label="Nomor Rekening"
            placeholder="Isi nomor rekening tanpa kode bank"
            value={form.no_rekening}
            onChangeText={value => setForm('no_rekening', value)}
            keyboardType="numeric"
          />
          <Gap height={16} />
          <TextInput
            label="Noma Pemilik Rekening"
            placeholder="Isi nomor rekening tanpa kode bank"
            value={form.nama_rekening}
            onChangeText={value => setForm('nama_rekening', value)}
          />
          <Gap height={24} />
          <Button label="Daftar Sekarang" onPress={onSubmit} />
          <Gap height={13} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpCanteen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },

  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
