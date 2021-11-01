import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Button, Gap, Header, TableSection} from '../../components';

const History = () => {
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
        <TableSection />
        <TableSectison />
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
});
