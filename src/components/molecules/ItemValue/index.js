import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../../../utils';
import Number from '../Number';

const ItemValue = ({title, profile, value, name, colorValue}) => {
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
  const renderValue = () => {
    if (name) {
      return <Text style={styles.valueItem(colorValue)}>{name}</Text>;
    } else {
      return (
        <Text style={styles.valueItem(colorValue)}>
          <Number number={value} />
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleItem}>{title}</Text>
      {renderValue()}
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
  titleItem: {
    fontSize: 13,
    fontFamily: fonts.primary[400],
    color: '#8D92A3',
  },
  valueItem: colorValue => ({
    textAlign: 'right',
    fontSize: 13,
    color:
      colorValue == 'PENDING'
        ? '#FEA34F'
        : colorValue == 'CANCEL ORDER'
        ? 'red'
        : colorValue == 'DELIVERED' ||
          colorValue == 'ON DELIVERY' ||
          colorValue == 'FEEDBACK' ||
          colorValue == 'PROCESS'
        ? 'green'
        : 'black',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',

    flex: 1,
  }),
});
