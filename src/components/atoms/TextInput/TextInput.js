import React from 'react';

import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';

const TextInput = ({
  label,
  signIn,
  longInput,
  placeholder,
  icon,
  iconPosition,
  secureTextEntry,
  ...restProps
}) => {
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  if (longInput) {
    return (
      <View>
        <Text style={styles.text}>{label}</Text>
        <TextInputRN
          placeholder={placeholder}
          style={styles.textArea}
          {...restProps}
        />
      </View>
    );
  }
  if (signIn) {
    return (
      <View style={styles.passwordIcon}>
        <Text style={styles.text}> {label}</Text>
        <View
          style={[
            styles.wrapper,
            {alignItems: icon ? 'center' : 'baseline'},
            {
              backgroundColor: '#F9EFEF',
              flexDirection: getFlexDirection(),
            },
          ]}>
          <View style={{marginRight: 10}}>{icon && icon}</View>
          <TextInputRN
            placeholder={placeholder}
            style={styles.inputPwd}
            secureTextEntry={secureTextEntry}
            {...restProps}
          />
        </View>
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {borderRadius: 8, backgroundColor: '#F9EFEF', padding: 10},
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  textArea: {
    borderRadius: 8,
    height: 100,
    padding: 10,
    backgroundColor: '#F9EFEF',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  inputPwd: {
    flex: 1,
    padding: 10,
    borderRadius: 7,
  },

  wrapper: {
    borderRadius: 7,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 5,
  },
});
