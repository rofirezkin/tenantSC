import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Button, Gap, Link} from '../../atoms';
import {DummyList1, IMGDummyFoodCourt} from '../../../assets';
import {fonts} from '../../../utils';
import {ItemValue, Number} from '..';
import {useDispatch} from 'react-redux';
import {progressOrder, setLoading} from '../../../redux/action';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OrderDetailData = ({
  name,
  onPress,
  quantity,
  status,
  phone,
  kodeTransaksi,
  method,
  createdAt,
  methodPayment,
  catatan,
  id,
  total,
  buktiPembayaran,
  price,
  proofPayment,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shortDesc = method;
  // shortDesc.toString();
  // let fixedDesc = '';
  // if (shortDesc.length > 9) {
  //   fixedDesc = shortDesc.substring(0, 8);
  // } else {
  //   fixedDesc = shortDesc;
  // }

  // const konfirmasiProses = () => {
  //   dispatch(setLoading(true));
  //   const statusData = {
  //     status: 'PROCESS',
  //   };
  //   dispatch(progressOrder(statusData, id, navigation));
  // };

  // const konfirmasiAntarPesanan = () => {
  //   dispatch(setLoading(true));
  //   const statusData = {
  //     status: 'ON DELIVERY',
  //   };
  //   dispatch(progressOrder(statusData, id, navigation));
  // };
  // const konfirmasiPesananDiterima = () => {
  //   dispatch(setLoading(true));
  //   const statusData = {
  //     status: 'FEEDBACK',
  //   };
  //   dispatch(progressOrder(statusData, id, navigation));
  // };
  // const konfirmasiPesananBatal = () => {
  //   dispatch(setLoading(true));
  //   const statusData = {
  //     status: 'CANCEL ORDER',
  //   };
  //   dispatch(progressOrder(statusData, id, navigation));
  // };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View>
          {kodeTransaksi && (
            <ItemValue
              title={`Kode Transaksi`}
              colorValue="DELIVERED"
              name={kodeTransaksi}
            />
          )}

          <ItemValue title={`Nama Pelanggan`} name={name} />
          <ItemValue title={`Jumlah Order`} name={`${quantity} Menu`} />
          {total && (
            <>
              {/* <Text>
                Pajak : <Number style={styles.desc} number={tax} />
              </Text>
              <Text>
                Biaya Pelayanan :{' '}
                <Number style={styles.desc} number={service} />
              </Text> */}

              <ItemValue title={`Total Harga termasuk layanan`} value={total} />
            </>
          )}

          <Gap height={10} />
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}} />
          <Gap height={10} />
          <ItemValue
            title={`Metode Pembayaran`}
            name={methodPayment == 1 ? 'Cash' : 'QRIS Payment'}
            colorValue={'DELIVERED'}
          />

          <ItemValue
            title={`Metode User`}
            colorValue="DELIVERED"
            name={method}
          />

          <ItemValue title={`Status Order`} name={status} colorValue={status} />
          <ItemValue title={`Catatan`} name={catatan} />
          <ItemValue title={`Tanggal Transaksi`} name={createdAt} />

          {/* <Text style={styles.desc}>No Hp : {phone}</Text> */}

          {/* <View style={{flexDirection: 'row'}}>
          <Text style={styles.desc}>total Harga : </Text>
          <Number style={styles.desc} number={total} />
        </View> */}
          {proofPayment && buktiPembayaran && (
            <View style={{alignItems: 'center'}}>
              <Link
                title="Lihat Bukti Pembayaran"
                linkPayment
                onPress={proofPayment}
              />
            </View>
          )}
          {proofPayment && !buktiPembayaran && methodPayment == 0 && (
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'red'}}>
                Pelanggan belum memberikan bukti pembayaran
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderDetailData;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    marginTop: 10,

    paddingBottom: 10,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  statusOrder: status => ({
    color:
      status == 'PENDING'
        ? '#FEA34F'
        : status !== 'CANCEL ORDER'
        ? 'green'
        : 'red',
  }),
});
