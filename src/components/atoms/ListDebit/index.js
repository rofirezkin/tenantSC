import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gap} from '..';
import {ICBank, ICGopay, Next} from '../../../assets';
import {fonts} from '../../../utils';

const ListDebit = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Withdraw')}
        style={styles.container}>
        <View style={styles.icon}>
          <ICGopay />
          <Text style={styles.label}> Gopay</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Next />
        </View>
      </TouchableOpacity>
      <Gap height={20} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Withdraw')}
        style={styles.container}>
        <View style={styles.icon}>
          <ICBank />
          <Text style={styles.label}> Bank</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Next />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListDebit;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDBCBD',
  },
  icon: {
    flexDirection: 'row',
  },
  label: {
    textAlignVertical: 'center',
    marginLeft: 18,
    fontFamily: fonts.primary[400],
    fontSize: 19,
  },
});
