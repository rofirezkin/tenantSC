import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NumberFormat from 'react-number-format';
import {useDispatch} from 'react-redux';
import {TextInput} from '..';
import {API_HOST} from '../../../config';
import {setLoading} from '../../../redux/action';

const InputCostum = ({onValueChange, ...props}) => {
  const [nilai, setNilai] = useState(`${props.price}`);
  const dispatch = useDispatch();
  useEffect(() => {
    onValueChange(nilai);
  }, [nilai]);

  return (
    <NumberFormat
      value={nilai}
      thousandSeparator="."
      displayType="text"
      renderText={value => (
        <TextInput
          label={props.label}
          value={value}
          onChangeText={value => setNilai(value)}
          {...props}
        />
      )}
      decimalSeparator=","
    />
  );
};
export default InputCostum;

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
