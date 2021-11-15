import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gap, Header, ListStatus} from '../../components';

const StatusTransfer = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Status transfer"
        subtTitle="Lihat status transfer anda"
        onPress={() => navigation.goBack()}
        onBack
      />
      <View style={styles.container}>
        <Gap height={20} />
        <ListStatus />
      </View>
    </View>
  );
};

export default StatusTransfer;

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
});
