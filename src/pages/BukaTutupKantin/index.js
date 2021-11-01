import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILBukaTutup} from '../../assets';
import {Button, Gap, Header, Modals} from '../../components';

const BukaTutupKantin = ({navigation}) => {
  const [showWarningOpen, SetshowWarningOpen] = useState(false);
  const [showWarningClose, SetshowWarningClose] = useState(false);
  const StatusKantin = () => {
    navigation.replace('MainApp');
  };
  const CheckingStatusOpen = () => {
    SetshowWarningOpen(true);
  };
  const CheckingStatusClose = () => {
    SetshowWarningClose(true);
  };
  return (
    <View style={styles.page}>
      <Modals
        type="buka"
        visible={showWarningOpen}
        onRequestClose={() => SetshowWarningOpen(false)}
        showWarningFalse={() => SetshowWarningOpen(false)}
        onPress={StatusKantin}
      />
      <Modals
        type="tutup"
        visible={showWarningClose}
        onRequestClose={() => SetshowWarningClose(false)}
        showWarningFalse={() => SetshowWarningClose(false)}
        onPress={StatusKantin}
      />
      <Header
        onBack
        onPress={() => navigation.goBack()}
        title="Status Kantin"
        subtTitle="Buka atau Tutup kantin anda"
      />
      <View style={styles.container}>
        <View style={styles.illustration}>
          <ILBukaTutup />
        </View>
        <Gap height={20} />
        <Button label="Buka kantin hari ini" onPress={CheckingStatusOpen} />
        <Gap height={20} />
        <Button label="Tutup kantin hari ini" onPress={CheckingStatusClose} />
      </View>
    </View>
  );
};

export default BukaTutupKantin;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  illustration: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 19,
  },
});
