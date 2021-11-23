import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Gap from '../Gap';
import {ICEllips, ICEllipsActive} from '../../../assets';
import {fonts} from '../../../utils';

const ListStatus = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.icon}>
          <View style={{marginLeft: -4}}>
            <ICEllipsActive />
          </View>
        </View>
        <View>
          <Text style={styles.text}>Penarikan Dana Diajukan</Text>
          <Text style={styles.subText}>10 Nov 2021, 10.20</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.icon}>
          <View style={{marginLeft: -4}}>
            <ICEllips />
          </View>
        </View>
        <View>
          <Gap height={10} />
          <Text style={styles.text}>Penarikan Dana Disetujui</Text>
          <Text style={styles.subText}>10 Nov 2021, 10.20</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconFinish}>
          <View style={{marginLeft: -4}}>
            <ICEllipsActive />
          </View>
        </View>
        <View>
          <Gap height={10} />
          <Text style={styles.text}>Penarikan Selesai</Text>
          <Text style={styles.subText}>10 Nov 2021, 10.20</Text>
          <Text style={styles.subText}>
            Penarikan dana telah selesai. Mohon cek rekening tujuan anda
          </Text>
        </View>
      </View>
    </>
  );
};

export default ListStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: '#2FAD24',
    width: 3,
  },
  iconFinish: {
    width: 3,
  },
  text: {
    marginLeft: 20,
    fontSize: 17,
    color: 'black',
    fontFamily: fonts.primary[500],
  },
  subText: {
    fontSize: 15,
    marginLeft: 20,
    color: '#909090',
  },
});
