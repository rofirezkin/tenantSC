import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({
  label,
  color = '#ED212B',
  onPress,
  double,
  textColor = 'white',
  costumerOrder,
  myFood,
}) => {
  if (myFood) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.containerButton(color)}>
          <Text style={styles.textOrder(color)}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  if (costumerOrder) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.containerOrder(color)}>
          <Text style={styles.textOrderWhite}>{label}</Text>
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
    paddingHorizontal: 17,
    borderRadius: 14,
  }),
  textOrder: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    textAlign: 'center',
  },
  containerButton: color => ({
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderColor: color,
    borderWidth: 2,
    marginRight: 20,
  }),
  textOrder: color => ({
    color: color,
  }),
  textOrderWhite: {
    color: 'white',
  },
});
