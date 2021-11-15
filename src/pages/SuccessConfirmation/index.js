import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ICSuccessPenarikan} from '../../assets';
import {Button, Gap, Header, ItemValue} from '../../components';
import {fonts} from '../../utils';

const SuccessConfirmation = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        exit
        title="Sukses Pengajuan Penarikan"
        subtTitle="Pengambilan Uang jadi lebih mudah"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          })
        }
        onBack
      />
      <View style={styles.container}>
        <View style={styles.icon}>
          <ICSuccessPenarikan />
        </View>
        <View>
          <Gap height={20} />
          <Text style={styles.title}>Penarikan Dana Diajukan</Text>
          <Gap height={20} />
          <View>
            <ItemValue title="Tanggal" value="10 Nov 2021, 20:20" />
            <Gap height={15} />
            <ItemValue title="Jumlah" value="Rp20.000" />
            <Gap height={15} />
            <ItemValue title="Biaya Admin" value="Rp1.000" />
            <Gap height={15} />
            <ItemValue title="Total" value="Rp21.000" />
            <Gap height={15} />
            <ItemValue title="Penarikan dana ke" value="GO-PAY" />
          </View>
        </View>
        <Gap height={20} />
        <Button
          textColor="#FF0000"
          color="white"
          label="Lihat Status Penarikan"
          onPress={() => navigation.navigate('StatusTransfer')}
        />
      </View>
    </View>
  );
};

export default SuccessConfirmation;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    paddingTop: 20,
    marginTop: 20,
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 19,
  },
  input: {
    borderColor: 'red',
    borderWidth: 2,
  },
  icon: {
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.primary[500],
  },
});
