import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ILBukaTutup} from '../../assets';
import {Button, Gap, Header, Modals} from '../../components';
import {API_HOST} from '../../config';
import {updateStatusAction} from '../../redux/action';
import {getData, showMessage} from '../../utils';

const BukaTutupKantin = ({navigation}) => {
  const [showWarningOpen, SetshowWarningOpen] = useState(false);
  const [showWarningClose, SetshowWarningClose] = useState(false);
  const [status, setStatus] = useState('');
  const [token, setToken] = useState('');
  const [dataProfile, setDataProfile] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    getData('userProfile').then(res => {
      setStatus(res.status);
      setDataProfile(res);
    });
    getData('token').then(res => {
      setToken(res.value);
    });
  }, []);

  const StatusKantinActive = () => {
    const data = {
      status: 'active',
    };
    console.log('data', data);
    dispatch(updateStatusAction(data, token, dataProfile, navigation));
  };

  const StatusKantinInactive = () => {
    const data = {
      status: 'inactive',
    };
    console.log('acitve', data);

    dispatch(updateStatusAction(data, token, dataProfile, navigation));
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
        token={token}
        type="buka"
        visible={showWarningOpen}
        onRequestClose={() => SetshowWarningOpen(false)}
        showWarningFalse={() => SetshowWarningOpen(false)}
        onPress={StatusKantinActive}
      />
      <Modals
        type="tutup"
        visible={showWarningClose}
        onRequestClose={() => SetshowWarningClose(false)}
        showWarningFalse={() => SetshowWarningClose(false)}
        onPress={StatusKantinInactive}
      />
      <Header
        onBack
        onPress={() => navigation.goBack()}
        title="Status Kantin"
        subtTitle="Buka atau Tutup kantin anda"
      />
      <View style={styles.container}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 30,
              color: 'green',
              fontSize: 17,
            }}>{` Status Kantin Anda ${status}`}</Text>
        </View>
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
