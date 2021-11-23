import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NumberFormat from 'react-number-format';
import {useDispatch} from 'react-redux';
import {API_HOST} from '../../../config';
import {setLoading} from '../../../redux/action';

const UseAutoFocus = ({autoFocus, ...props}) => {
  const navigation = useNavigation();
  const ref = useRef(null);
  const [nilai, setNilai] = useState(`${props.price}`);
  const dispatch = useDispatch();
  useEffect(() => {
    autoFocus &&
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
        }
      }, 100);
  });

  const onPressChangePrice = () => {
    const newValue = parseInt(nilai.replace(/\./g, ''), 10);

    console.log('hal', typeof newValue);
    const data = {
      price: newValue,
    };
    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/menu/update/price/${props.idMenu}`, data, {
        headers: {
          Authorization: props.token,
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
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 20, textAlignVertical: 'center'}}>Rp</Text>
        <NumberFormat
          value={nilai}
          thousandSeparator="."
          displayType="text"
          renderText={value => (
            <TextInput
              value={value}
              onChangeText={value => setNilai(value)}
              returnKeyType="done"
              style={styles.input}
              ref={ref}
              {...props}
            />
          )}
          decimalSeparator=","
        />
      </View>
      <View style={styles.modalsButton}>
        <TouchableOpacity
          onPress={onPressChangePrice}
          style={styles.warning_button}>
          <Text style={styles.textModals}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UseAutoFocus;

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    borderBottomColor: '#38D735',
    borderBottomWidth: 1,
    fontSize: 20,
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
  textModals: {
    color: 'white',
    fontSize: 13,
    margin: 10,
    textAlign: 'center',
  },
});
