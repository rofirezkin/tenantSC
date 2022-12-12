import {Alert, StyleSheet, RefreshControl, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  ButtonEdit,
  CostumerDineIn,
  Gap,
  Header,
  ItemValue,
  Link,
  OrderData,
  OrderDetailData,
  ShoppingCart,
} from '../../components';
import axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showMessage} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {progressOrder, setLoading} from '../../redux/action';
import NotifService from '../../utils/notification/NotifService';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {skeletonDetailTransaction} from '../../components/skeleton/skeletonDetailOrder';

const DetailTransaction = ({route, navigation}) => {
  const dispatch = useDispatch();
  const params = route.params;


  const [refresh, setRefresh] = useState(false);
  const [detailOrder, setDetailOrder] = useState([]);
  const [status, setStatus] = useState('');
  const [totalHarga, setTotalHarga] = useState();
  const [photoPayment, setPhotoPayment] = useState(null);
  const [profileTenant, setProfileTenant] = useState('');
  const [catatan, setCatatan] = useState('');
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [nomorMeja, setNomorMeja] = useState(null);
  const [statusPembayaran, setStatusPembayaran] = useState('');

  // const totalHarga = parseInt(params.total) + 1000 + 2000;
  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
    navigation.replace('MainApp', {screen: 'CostumerOrder'});
  };
  const notif = new NotifService(onNotif);

  const getDetailData = () => {
    getData('userProfile').then(res => {
      setProfileTenant(res);
    });
    getData('token').then(resToken => {
      axios
        .get(
          `${API_HOST.url}/transactions/tenant/detailOrder?kode_transaksi=${params.kode_transaksi}`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        )
        .then(res => {

          setLoadingSkeleton(false);
          const detailData = res.data.data[0];
          setPhotoPayment(res.data.data[0].photo_bukti_pembayaran);
          setCatatan(res.data.data[0].catatan);
          setNomorMeja(res.data.data[0].no_table);
          setStatusPembayaran(res.data.data[0].status_pembayaran_qris);
          setStatus(detailData.status);
          // let calculate = 3000;
          // for (let i = 0; i < dataHarga.length; i++) {
          //   calculate += parseInt(dataHarga[i].total);
          // }

          setTotalHarga(detailData.total_order);
          setDetailOrder(res.data.data);
        })
        .catch(err => {
          setLoadingSkeleton(false);
          showMessage(err?.message);

        });
    });
  };

  useEffect(() => {
    getDetailData();
  }, []);

  const sendNotificationToUser = {
    kode_transaksi: params.kode_transaksi,
    nim: params.nim,
    nama_tenant: profileTenant.nama_tenant,
    id_tenant: profileTenant.id,
    quantity: params.quantity,
    orderView: true,
    lokasi_kantin: profileTenant.lokasi_kantin,
    status: params.status,
    created_at: params.created_at,
  };



  const konfirmasiProses = () => {
    dispatch(setLoading(true));

    const statusData = {
      status: 'PROCESS',
    };
    sendNotificationToUser.status = 'PROCESS';
    dispatch(
      progressOrder(
        sendNotificationToUser,
        statusData,
        params.kode_transaksi,
        params.device_token,
        notif,
        profileTenant.nama_tenant,
        navigation,
      ),
    );
  };

  const konfirmasiAntarPesanan = () => {
    dispatch(setLoading(true));
    sendNotificationToUser.status = 'ON DELIVERY';
    const statusData = {
      status: 'ON DELIVERY',
    };
    dispatch(
      progressOrder(
        sendNotificationToUser,
        statusData,
        params.kode_transaksi,
        params.device_token,
        notif,
        profileTenant.nama_tenant,
        navigation,
      ),
    );
  };

  const konfirmasiAntarPesananDineIn = () => {
    dispatch(setLoading(true));
    const statusData = {
      status: 'COMPLETED',
    };
    sendNotificationToUser.status = 'COMPLETED';
    dispatch(
      progressOrder(
        sendNotificationToUser,
        statusData,
        params.kode_transaksi,
        params.device_token,
        notif,
        profileTenant.nama_tenant,
        navigation,
      ),
    );
  };

  const konfirmasiPesananDiterima = () => {
    dispatch(setLoading(true));
    const statusData = {
      status: 'FEEDBACK',
    };
    sendNotificationToUser.status = 'FEEDBACK';
    dispatch(
      progressOrder(
        sendNotificationToUser,
        statusData,
        params.kode_transaksi,
        params.device_token,
        notif,
        profileTenant.nama_tenant,
        navigation,
      ),
    );
  };
  const konfirmasiPesananBatal = () => {
    dispatch(setLoading(true));
    const statusData = {
      status: 'CANCEL ORDER',
    };
    sendNotificationToUser.status = 'CANCEL ORDER';
    dispatch(
      progressOrder(
        sendNotificationToUser,
        statusData,
        params.kode_transaksi,
        params.device_token,
        notif,
        profileTenant.nama_tenant,
        navigation,
      ),
    );
  };
  const konfirmasiPesananSiapDiterima = () => {
    dispatch(setLoading(true));
    const statusData = {
      status: 'READY TO TAKE',
    };
    sendNotificationToUser.status = 'READY TO TAKE';
    dispatch(
      progressOrder(
        sendNotificationToUser,
        statusData,
        params.kode_transaksi,
        params.device_token,
        notif,
        profileTenant.nama_tenant,
        navigation,
      ),
    );
  };

  // refresh controll
  const onRefresh = React.useCallback(() => {
    setLoadingSkeleton(true);
    setRefresh(true);
    getDetailData();
    setRefresh(false);
  }, []);

  return (
    <View style={{backgoundColor: 'red', flex: 1}}>
      <ScrollView
        style={styles.page}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
        <Header
          title="Detail Order"
          onPress={() => navigation.goBack()}
          subtTitle="Lihat Detail Order Pelanggan"
          onBack={() => {}}
        />
        <SkeletonContent
          containerStyle={{flex: 1}}
          isLoading={loadingSkeleton}
          layout={skeletonDetailTransaction}>
          <View style={{backgroundColor: '#F2F2F2', padding: 8}} />
          <View
            style={{
              backgroundColor: 'white',
            }}>
            <OrderDetailData
              statusPembayaran={statusPembayaran}
              catatan={catatan}
              phone={params.phoneNumber}
              total={totalHarga}
              name={params.nama_pelanggan}
              quantity={params.quantity}
              status={params.status}
              method={params.method}
              tax={1000}
              noMeja={nomorMeja}
              kodeTransaksi={params.kode_transaksi}
              createdAt={params.created_at}
              methodPayment={params.is_cash}
              buktiPembayaran={photoPayment}
            />
          </View>
          <View style={styles.container}>
            {detailOrder.map(order => {
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
                <CostumerDineIn
                  key={order.name}
                  foodName={order.name}
                  kodeTransaksi={order.kode_transaksi}
                  phone={order.phoneNumber}
                  picturePath={order.picturePath}
                  category={order.category}
                  total={order.total}
                  is_active={order.is_active}
                  name={order.nama_pelanggan}
                  quantity={order.quantity}
                  status={order.status}
                  method={order.method}
                />
              );
            })}
          </View>
          {/* <View style={styles.buttonSection}>
            <Button costumerOrder label="diantar" />
            <Button costumerOrder label="sudah diantar" />
          </View> */}
        </SkeletonContent>
        <Gap height={40} />
      </ScrollView>
      {!loadingSkeleton && (
        <View style={styles.button}>
          {status == 'PENDING' && statusPembayaran == 'success' && (
            <Button
              costumerOrder
              label="Konfirmasi proses"
              onPress={konfirmasiProses}
            />
          )}
          {status == 'PROCESS' && params.method == 'Delivery' && (
            <Button
              costumerOrder
              label="Antar Pesanan"
              onPress={konfirmasiAntarPesanan}
            />
          )}
          {status == 'PROCESS' && params.method == 'Dine In' && (
            <Button
              costumerOrder
              label="Pesanan Selesai"
              onPress={konfirmasiAntarPesananDineIn}
            />
          )}
          {status == 'PROCESS' && params.method == 'Take Away' && (
            <Button
              costumerOrder
              label="Konfirmasi Siap Diterima"
              onPress={konfirmasiPesananSiapDiterima}
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
          {status == 'COMPLETED' && (
            <Text style={styles.feedback}>Menunggu Konfirmasi user</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default DetailTransaction;

const styles = StyleSheet.create({
  page: {flexGrow: 1, backgroundColor: 'white'},
  container: {
    paddingHorizontal: 19,
    flex: 1,

    backgroundColor: 'white',
  },
  button: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 19,
    width: '100%',
  },
  feedback: {
    color: '#FEA34F',
  },
});
