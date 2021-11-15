import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  InteractionManager,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NumberFormat from 'react-number-format';
import {useDispatch} from 'react-redux';
import {Button, Gap, Select, UseAutoFocus} from '../..';
import {ICCLoseModals, ICGopay, statusMenu} from '../../../assets';
import {API_HOST} from '../../../config';
import {setLoading} from '../../../redux/action';
import {colors, fonts} from '../../../utils';

const ModalsMenu = ({
  type,
  visible,
  onRequestClose,
  token,
  idMenu,
  price,
  onPress,
  is_active,
}) => {
  const [isActive, setIsActive] = useState(is_active);
  const [changePrice, setChangePrice] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onPressChangeStatus = () => {
    console.log('haloo mau dikrim', isActive);
    const data = {
      is_active: isActive,
    };
    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/menu/update/status/${idMenu}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        dispatch(setLoading(false));
        console.log('berhasil', res);
        navigation.reset({
          index: 0,
          routes: [{name: 'MainApp'}],
        });
      })
      .catch(err => {
        dispatch(setLoading(false));
        console.log('error', err.response);
      });
  };

  return (
    <View>
      {type === 'status' && (
        <Modal
          visible={visible}
          transparent
          onRequestClose={onRequestClose}
          animationType="slide"
          hardwareAccelerated>
          <View style={styles.centered_view}>
            <View style={styles.warning_modal}>
              <View style={styles.warning_title}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onRequestClose}
                  style={{alignSelf: 'center'}}>
                  <ICCLoseModals />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Ubah Status</Text>
              </View>
              <Select
                label="Kategori Menu"
                value={isActive}
                selectItem={statusMenu}
                onValueChange={value => setIsActive(value)}
              />
              <View style={styles.modalsButton}>
                <TouchableOpacity
                  onPress={() => onPressChangeStatus()}
                  style={styles.warning_button}>
                  <Text style={styles.textModals}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {type === 'harga' && (
        <Modal
          visible={visible}
          transparent
          onRequestClose={onRequestClose}
          animationType="fade"
          hardwareAccelerated>
          <View style={styles.centered_view}>
            <View style={styles.warning_modal}>
              <View style={styles.warning_title}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onRequestClose}
                  style={{alignSelf: 'center'}}>
                  <ICCLoseModals />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Atur Harga</Text>
              </View>

              <UseAutoFocus
                idMenu={idMenu}
                token={token}
                price={price}
                keyboardType="numeric"
                autoFocus={true}
              />
            </View>
          </View>
        </Modal>
      )}
      {type === 'detail-va' && (
        <Modal
          visible={visible}
          transparent
          onRequestClose={onRequestClose}
          animationType="slide"
          hardwareAccelerated>
          <View style={styles.centered_view}>
            <View style={styles.warning_modal}>
              <View style={styles.warning_title}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onRequestClose}
                  style={{alignSelf: 'center'}}>
                  <ICCLoseModals />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Detail Penarikan Dana</Text>
              </View>
              <View style={styles.iconPenarikan}>
                <ICGopay />
                <View style={styles.cardIcon}>
                  <Text style={styles.textIcon}>Gopay</Text>
                  <Text style={styles.textIcon}>+6284040500</Text>
                </View>
              </View>
              <Gap height={10} />
              <Button onPress={onRequestClose} label="Lanjutkan" />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ModalsMenu;

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  warning_title: {
    marginVertical: 10,
    flexDirection: 'row',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardIcon: {
    marginLeft: 12,
  },
  textHeader: {
    color: '#000000',
    fontSize: 18,
    fontFamily: fonts.primary[400],

    paddingTop: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  warning_modal_catatan: {
    width: 200,
    height: 200,
    backgroundColor: '#ffffff',

    borderRadius: 10,
  },
  modalsButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  warning_button: {
    backgroundColor: '#C51B24',
    width: 100,
    borderRadius: 10,
  },
  textIcon: {
    fontSize: 15,
    fontFamily: fonts.primary[400],
  },
  text: {
    color: '#000000',
    fontSize: 13,
    margin: 10,
    textAlign: 'center',
  },
  textModals: {
    color: 'white',
    fontSize: 13,
    margin: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  iconPenarikan: {
    flexDirection: 'row',
  },
});
