import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Counter1, Counter2} from '../../../assets';

const ButtonEdit = ({payment, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Edit</Text>
    </TouchableOpacity>
  );
};

export default ButtonEdit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ED212B',
    marginTop: 13,
    paddingVertical: 4,
    paddingHorizontal: 13,
    borderRadius: 6,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCounter: {
    padding: 5,
  },
});
