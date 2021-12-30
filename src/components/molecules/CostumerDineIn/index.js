import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Button} from '../../atoms';
import {DummyList1, IMGDummyFoodCourt} from '../../../assets';
import {fonts} from '../../../utils';
import {ItemValue, Number} from '..';
import {useDispatch} from 'react-redux';
import {progressOrder, setLoading} from '../../../redux/action';
import {useNavigation} from '@react-navigation/native';

const CostumerDineIn = ({
  foodName,
  total,
  name,
  category,
  quantity,
  status,
  ingredients,
  picturePath,
  phone,
  kodeTransaksi,
  method,
  token,
  id,
  price,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shortDesc = method;
  shortDesc.toString();
  let fixedDesc = '';
  if (shortDesc.length > 9) {
    fixedDesc = shortDesc.substring(0, 8);
  } else {
    fixedDesc = shortDesc;
  }

  const konfirmasiProses = () => {
    dispatch(setLoading(true));
    const statusData = {
      status: 'PROCESS',
    };
    dispatch(progressOrder(statusData, id, navigation));
  };

  const konfirmasiAntarPesanan = () => {
    dispatch(setLoading(true));
    const statusData = {
      status: 'ON DELIVERY',
    };
    dispatch(progressOrder(statusData, id, navigation));
  };
  const konfirmasiPesananDiterima = () => {
    dispatch(setLoading(true));
    const statusData = {
      status: 'FEEDBACK',
    };
    dispatch(progressOrder(statusData, id, navigation));
  };
  const konfirmasiPesananBatal = () => {
    dispatch(setLoading(true));
    const statusData = {
      status: 'CANCEL ORDER',
    };
    dispatch(progressOrder(statusData, id, navigation));
  };
  return (
    <View style={styles.card}>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 19,
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <Text style={styles.headers}>{method}</Text>
        <Text style={styles.headerskode}>{kodeTransaksi}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.wrapperText}>
          <View style={styles.cardTitle}>
            <Text style={styles.title}>{foodName}</Text>
          </View>
          <Text style={styles.menuContent}>{ingredients}</Text>
          <View style={styles.description}>
            <View style={styles.prop1}>
              <Text style={styles.desc}>Nama : {name}</Text>
              <Text style={styles.desc}>Jumlah : {quantity} Item</Text>
              <Text style={styles.desc}>No Hp : {phone}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.desc}>total : </Text>
                <Number style={styles.desc} number={total} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cardImage}>
          <Image source={{uri: picturePath}} style={styles.image} />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.price}>harga : </Text>
              <Number style={styles.price} number={price} />
            </View>
            <Text style={styles.desc}>Kategori : {category}</Text>
            <Text style={styles.descStatus(status)}>Status : {status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonSection}>
        {status == 'PENDING' && (
          <Button
            costumerOrder
            label="Konfirmasi proses"
            onPress={konfirmasiProses}
          />
        )}
        {status == 'PROCESS' && (
          <Button
            costumerOrder
            label="Antar Pesanan"
            onPress={konfirmasiAntarPesanan}
          />
        )}
        {status == 'ON DELIVERY' && (
          <Button
            costumerOrder
            label="Pesanan diterima"
            onPress={konfirmasiPesananDiterima}
          />
        )}
        {status == 'PENDING' && (
          <Button
            costumerOrder
            label="Cancel order"
            onPress={konfirmasiPesananBatal}
          />
        )}
        {status == 'FEEDBACK' && (
          <Text style={styles.feedback}>Menunggu Feedback user</Text>
        )}
        {/* <Button costumerOrder label="diantar" />
        <Button costumerOrder label="sudah diantar" /> */}
      </View>
    </View>
  );
};

export default CostumerDineIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 19,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  cardTitle: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: fonts.primary[400],
    fontSize: 16,
  },
  feedback: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: '#FEBC5A',
  },
  headers: {
    flex: 1,

    color: 'black',
    fontFamily: fonts.primary[400],
    fontSize: 16,
  },
  headerskode: {
    textAlign: 'right',
    flex: 1,

    color: 'black',
    fontFamily: fonts.primary[400],
    fontSize: 16,
  },
  statusMenu: {
    marginLeft: 7,
    textAlignVertical: 'bottom',
    fontSize: 10,
    fontFamily: fonts.primary[400],
    color: '#2B9F61',
    maxWidth: '80%',
  },
  description: {
    marginTop: 5,
  },
  image: {
    width: 90,
    height: 80,
    borderRadius: 10,
  },
  menuContent: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: '#8D92A3',
  },
  wrapperText: {
    flex: 1,
  },
  cardImage: {
    alignItems: 'flex-end',
  },
  descStatus: status => ({
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: status == 'CANCEL ORDER' ? 'red' : 'green',
  }),
  desc: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: '#8D92A3',
  },
  price: {
    marginTop: 9,
    fontSize: 15,
    fontFamily: fonts.primary[500],
    color: '#535353',
  },
  statusPelanggan: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: '#61AB43',
  },
  prop: {
    marginRight: 15,
    flex: 1,
  },
  prop1: {
    marginRight: 15,
  },
  buttonSection: {
    marginTop: 10,
    paddingHorizontal: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
