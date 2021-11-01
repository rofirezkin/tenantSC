import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({
  label,
  color = '#ED212B',
  onPress,
  double,
  textColor = 'white',
  costumerOrder,
}) => {
  if (costumerOrder) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.containerOrder(color)}>
          <Text style={styles.textOrder}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.container(color, double)}>
        <Text style={styles.text(textColor)}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (color, double) => ({
    backgroundColor: color,
    padding: 15,
    paddingHorizontal: double ? 25 : 12,
    borderRadius: 8,
    borderWidth: color === 'white' ? 1 : 0,
    borderColor: '#ED212B',
  }),
  text: textColor => ({
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: textColor,
    textAlign: 'center',
  }),
  containerOrder: color => ({
    backgroundColor: color,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
  }),
  textOrder: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    textAlign: 'center',
  },
});
