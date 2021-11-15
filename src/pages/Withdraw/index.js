import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Gap, Header} from '../../components';
import {fonts} from '../../utils';

const Withdraw = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        onBack
        onPress={() => navigation.goBack()}
        title="Penarikan"
        subtTitle="BRI - 003322"
      />
      <View style={styles.container}>
        <Gap height={40} />
        <Text style={styles.title}>Amount (Rp) </Text>
        <View style={styles.cardAmount}>
          <TextInput
            keyboardType="numeric"
            style={styles.amount}
            placeholder="0"
          />
        </View>
        <View>
          <Text style={styles.mywallet}>My Wallet Rp200020</Text>
        </View>
        <Gap height={30} />
        <View>
          <Button
            label="Selanjutnya"
            onPress={() => navigation.navigate('DetailCashout')}
          />
        </View>
      </View>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingHorizontal: 19,
    paddingTop: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 19,
    fontFamily: fonts.primary[500],
    textAlign: 'center',
  },
  amount: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: fonts.primary[600],
    paddingHorizontal: 10,
    flex: 1,
  },
  cardAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rp: {
    textAlignVertical: 'center',
    fontFamily: fonts.primary[300],
    fontSize: 15,
  },
  mywallet: {
    fontFamily: fonts.primary[400],
    fontSize: 15,
    textAlign: 'center',
    color: '#747474',
  },
  textArea: {
    borderRadius: 8,
    height: 100,
    padding: 10,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
