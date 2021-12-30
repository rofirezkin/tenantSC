import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICGmail, ICWhatsapp, ILHelpCenter, ILMaintenance} from '../../assets';
import {Gap, Header} from '../../components';
import {fonts} from '../../utils';

const Maintenance = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        onBack
        onPress={() => navigation.goBack()}
        title="Maintenance"
        subtTitle="under maintenance"
      />
      <View style={styles.container}>
        <View style={styles.illustration}>
          <ILMaintenance />
        </View>
        <Gap height={20} />
        <View>
          <Text style={{textAlign: 'center'}}>
            This page is currently under maintenance, please try again later
          </Text>
        </View>
        <Gap height={20} />
      </View>
    </View>
  );
};

export default Maintenance;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingTop: 15,
    paddingHorizontal: 25,
  },
  illustration: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ED212B',
    height: 50,
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: fonts.primary[500],
    color: 'white',
    marginLeft: 20,
    flex: 1,
    textAlignVertical: 'center',
  },
  icon: {
    marginLeft: 20,
    justifyContent: 'center',
  },
});
