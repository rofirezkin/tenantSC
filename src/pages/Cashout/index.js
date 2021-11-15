import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICGopay} from '../../assets';
import {Header, ListDebit} from '../../components';

const Cashout = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        subtTitle="Pengambilan Uang jadi lebih mudah"
        title="Pilih Metode Cashout"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ListDebit />
      </View>
    </View>
  );
};

export default Cashout;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 19,
    paddingTop: 20,
    flex: 1,
  },
});
