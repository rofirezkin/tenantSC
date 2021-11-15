import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconAddHome} from '../../../assets';

const ButtonUploadMenu = ({onPress, label}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <IconAddHome />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonUploadMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2B9F61',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2B9F61',
    textAlign: 'center',
  },
});
