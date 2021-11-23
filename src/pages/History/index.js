import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Button, Gap, Header, TableSection} from '../../components';
import {fonts} from '../../utils';

const History = ({navigation}) => {
  const tableHead = useState(['Transaksi', 'Status', 'Jumlah']);
  const tableData = useState([
    ['Order ID : D1-99994', 'Sukses', 'Rp30.000'],
    ['Order ID : D1-99994', 'Sukses', 'Rp30.000'],
    ['Order ID : D1-99994', 'Sukses', 'Rp30.000'],
    ['Order ID : D1-99994', 'Sukses', 'Rp30.000'],
  ]);

  const Status = (data, index) => {
    return <Text style={styles.textSuccess}>{data}</Text>;
  };

  return (
    <ScrollView style={styles.page}>
      <Header
        title="History Pesanan"
        subtTitle="Monitoring Pesanan Pelanggan"
      />
      <View style={styles.container}>
        <View style={styles.cardSaldo}>
          <View style={styles.card}>
            <Text style={styles.label}>Saldo Saya: </Text>
            <Text style={styles.rupiah}>200.000 </Text>
            <View style={{marginHorizontal: 6}}>
              <Gap height={20} />
              <Button
                label="Withdraw"
                onPress={() => navigation.navigate('Cashout')}
              />
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 19, marginBottom: 10}}>
          <Gap height={20} />
          <Text style={styles.labelHistory}>History Transaksi Pembeli </Text>
        </View>
        <TableSection />
        <TableSection />
      </View>
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  page: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 15,
  },
  cardSaldo: {
    paddingHorizontal: 19,
    paddingTop: 20,
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
  labelHistory: {
    fontSize: 16,
    fontFamily: fonts.primary[500],
    color: 'black',
  },
  card: {
    borderColor: '#D2D2D2',
    borderWidth: 2,
    padding: 13,
    borderRadius: 10,
  },
});
