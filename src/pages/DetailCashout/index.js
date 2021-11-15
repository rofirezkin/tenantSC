import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICGopay} from '../../assets';
import {Button, Gap, Header, ItemValue, ModalsMenu} from '../../components';
import {fonts} from '../../utils';

const DetailCashout = ({navigation}) => {
  const [warningRekening, SetWarningRekening] = useState(false);
  const onDetail = () => {
    SetWarningRekening(true);
  };

  return (
    <View style={styles.page}>
      <Header
        title="Detail Metode Cashout"
        subtTitle="Lihat metode Cashout"
        onPress={() => navigation.goBack()}
        onBack
      />
      <ModalsMenu
        type="detail-va"
        visible={warningRekening}
        onRequestClose={() => SetWarningRekening(false)}
        showWarningFalse={() => SetWarningRekening(false)}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Ringkasan Penarikan Dana</Text>
        <Gap height={14} />
        <ItemValue value="Rp200" title="Jumlah" />
        <Gap height={14} />
        <ItemValue title="Biaya Admin" value="Rp2.000" />
        <Gap height={14} />
        <ItemValue title="Estimasi Waktu" value="30 Januari 2021" />
        <Gap height={20} />
        <Text style={styles.text}>Penarikan Dana ke</Text>
        <View style={styles.iconGopay}>
          <ICGopay />
          <Text style={styles.textIcon}>Gopay</Text>
          <TouchableOpacity onPress={onDetail} style={{flex: 1}}>
            <Text style={styles.textDetail}>Lihat Detail</Text>
          </TouchableOpacity>
        </View>
        <Gap height={30} />
        <Button
          label="Selesaikan"
          onPress={() => navigation.navigate('Confirmation')}
        />
      </View>
    </View>
  );
};

export default DetailCashout;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 19,
    marginTop: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary[500],
  },
  iconGopay: {
    flexDirection: 'row',
  },
  textIcon: {
    marginLeft: 15,
    fontSize: 17,
    fontFamily: fonts.primary[500],
    textAlignVertical: 'center',
  },
  textDetail: {
    textAlign: 'right',
    flex: 1,
    color: 'green',
    textAlignVertical: 'center',
  },
});
