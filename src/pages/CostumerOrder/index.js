import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, TabViewOrder} from '../../components';

const CostumerOrder = () => {
  return (
    <View style={styles.page}>
      <Header
        title="Pesanan Masuk"
        subtTitle="Konfirmasi Pesanan Pelanggan anda"
      />
      <View style={styles.container}>
        <TabViewOrder />
      </View>
    </View>
  );
};

export default CostumerOrder;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: 'white',
  },
});
