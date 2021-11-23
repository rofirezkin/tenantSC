import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../../../utils';

const ItemValue = ({title, profile, value, colorValue}) => {
  if (profile) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
          }}>
          <Text style={styles.value(colorValue)}>{value}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}>
        <Text style={styles.value(colorValue)}>{value}</Text>
      </View>
    </View>
  );
};

export default ItemValue;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: '#747474',
  },
  value: colorValue => ({
    fontSize: 16,
    color: colorValue ? '#1ABC9C' : 'black',
    fontFamily: fonts.primary[500],
  }),
});
