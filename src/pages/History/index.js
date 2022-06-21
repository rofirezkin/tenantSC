import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, RefreshControl, View} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useDispatch, useSelector} from 'react-redux';
import {ILNodata} from '../../assets';

import {
  Button,
  Gap,
  Header,
  Number,
  OrderData,
  TableSection,
} from '../../components';
import {skeletonDetailHistory} from '../../components/skeleton/skeletonDetailOrder';
import {getPastOrders} from '../../redux/action';
import {fonts, getData, getUidTime} from '../../utils';

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState('');
  const {pastOrder} = useSelector(state => state.customerOrderReducer);
  const {loadingSkeleton} = useSelector(state => state.globalReducer);
  const [refreshing, setRefreshing] = useState(false);

  console.log('passs orderr ,', pastOrder);
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);

      dispatch(getPastOrders(res.id));
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getPastOrders(userProfile.id));
    setRefreshing(false);
  };

  const today = new Date();
  const dateReport = getUidTime(today);

  let totalHarga = 0;
  for (let i = 0; i < pastOrder.length; i++) {
    const splitData = pastOrder[i].created_at.split(' ');
    console.log('ddd', splitData[0]);
    if (
      pastOrder[i].status == 'DELIVERED' ||
      (pastOrder[i].status == 'FEEDBACK' && splitData[0] == dateReport)
    ) {
      totalHarga += +pastOrder[i].total_order - pastOrder[i].kode_uniq;
    }
  }
  let transaksiBerhasil = 0;
  for (let i = 0; i < pastOrder.length; i++) {
    const splitData = pastOrder[i].created_at.split(' ');
    if (
      pastOrder[i].status == 'DELIVERED' ||
      (pastOrder[i].status == 'FEEDBACK' && splitData[0] == dateReport)
    ) {
      transaksiBerhasil += +pastOrder[i].quantity;
    }
  }
  let transaksiGagal = 0;
  for (let i = 0; i < pastOrder.length; i++) {
    const splitData = pastOrder[i].created_at.split(' ');
    if (pastOrder[i].status == 'CANCEL ORDER' && splitData[0] == dateReport) {
      transaksiGagal += +pastOrder[i].quantity;
    }
  }
  console.log('ddaaa', pastOrder);
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header
        title="History Pesanan"
        subtTitle="Monitoring Pesanan Pelanggan"
      />
      <SkeletonContent
        containerStyle={{flex: 1}}
        isLoading={loadingSkeleton}
        layout={skeletonDetailHistory}>
        <View style={styles.container}>
          <View style={styles.cardSaldo}>
            <View style={styles.card}>
              <Text style={styles.label}>Report Transaksi Perhari: </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 2}}>
                  <Text>Total Saldo</Text>
                  <Number style={styles.rupiah} number={totalHarga} />
                </View>
                <View style={{flex: 1}}>
                  <Text>Berhasil</Text>
                  <Text>{transaksiBerhasil} Menu</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>Gagal</Text>
                  <Text>{transaksiGagal} Menu</Text>
                </View>
              </View>
              <View style={{marginHorizontal: 6}}>
                <Gap height={20} />
                {/* <Button
                label="Withdraw"
                onPress={() => navigation.navigate('Cashout')}
              /> */}
              </View>
            </View>
          </View>

          <View style={{paddingHorizontal: 19, marginBottom: 10}}>
            <Gap height={20} />
            <Text style={styles.labelHistory}>History Transaksi Pembeli </Text>
          </View>
          <View>
            {pastOrder.map(order => {
              // const dataSubstring = [
              //   {desc: order.menu.ingredients, value: 40},
              //   {desc: order.menu.name, value: 25},
              // ];
              // var fixedDesc;
              // var data = [];
              // for (var i = 0; i < dataSubstring.length; i++) {
              //   if (dataSubstring[i].desc.length > dataSubstring[i].value) {
              //     fixedDesc =
              //       dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
              //       '...';
              //   } else {
              //     fixedDesc = dataSubstring[i].desc;
              //   }
              //   data.push({
              //     key: i,
              //     desc: fixedDesc,
              //   });
              // }
              return (
                <OrderData
                  onPress={() =>
                    navigation.navigate('DetailTransaction', order)
                  }
                  id={order.id}
                  kodeTransaksi={order.kode_transaksi}
                  phone={order.phoneNumber}
                  key={order.kode_transaksi}
                  name={order.nama_pelanggan}
                  quantity={order.quantity}
                  status={order.status}
                  method={order.method}
                  total={order.total_order - order.kode_uniq}
                  createdAt={order.created_at}
                />
              );
            })}
            {pastOrder.length == 0 && !loadingSkeleton && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ILNodata />
                <Gap height={10} />
                <Text>No data Order</Text>
              </View>
            )}
          </View>
        </View>
      </SkeletonContent>
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  page: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 15,
  },
  cardSaldo: {
    paddingHorizontal: 19,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: '#666666',
  },
  rupiah: {
    fontSize: 17,
    color: '#666666',
    fontFamily: fonts.primary[600],
  },
  labelHistory: {
    fontSize: 16,
    fontFamily: fonts.primary[500],
    color: 'black',
  },
  card: {
    borderColor: '#D2D2D2',
    borderWidth: 2,
    padding: 13,
    borderRadius: 10,
  },
});
