import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import CostumerDineIn from '../CostumerDineIn';
import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../../../utils';
import {
  getDeliveryOrder,
  getFeedbackOrder,
  getInProgress,
  getPastOrders,
} from '../../../redux/action';
import {ILNodata} from '../../../assets';
import {Gap} from '../..';
import {OrderData} from '..';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.topBar}
    contentContainerStyle={{
      justifyContent: 'space-around',
      flex: 1,
    }}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused, color}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);
const AllData = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState('');
  const {inProgress} = useSelector(state => state.customerOrderReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
      dispatch(getInProgress(res.id));
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getInProgress(userProfile.id));
    setRefreshing(false);
  };

  console.log('innsss', inProgress);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {inProgress.map(order => {
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
            onPress={() => navigation.navigate('DetailTransaction', order)}
            id={order.id}
            kodeTransaksi={order.kode_transaksi}
            phone={order.phoneNumber}
            key={order.kode_transaksi}
            name={order.nama_pelanggan}
            quantity={order.quantity}
            status={order.status}
            method={order.method}
          />
        );
      })}
      {inProgress.length == 0 && (
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
    </ScrollView>
  );
};

const Delivery = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState('');
  const {delivery} = useSelector(state => state.customerOrderReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
      dispatch(getDeliveryOrder(res.id));
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getDeliveryOrder(userProfile.id));
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {delivery.map(order => {
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
            onPress={() => navigation.navigate('DetailTransaction', order)}
            id={order.id}
            kodeTransaksi={order.kode_transaksi}
            phone={order.phoneNumber}
            key={order.kode_transaksi}
            name={order.nama_pelanggan}
            quantity={order.quantity}
            status={order.status}
            method={order.method}
          />
        );
      })}
      {delivery.length == 0 && (
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
    </ScrollView>
  );
};
const Feedback = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState('');
  const {feedback} = useSelector(state => state.customerOrderReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
      dispatch(getFeedbackOrder(res.id));
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getFeedbackOrder(userProfile.id));
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {feedback.map(order => {
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
            onPress={() => navigation.navigate('DetailTransaction', order)}
            id={order.id}
            kodeTransaksi={order.kode_transaksi}
            phone={order.phoneNumber}
            key={order.kode_transaksi}
            name={order.nama_pelanggan}
            quantity={order.quantity}
            status={order.status}
            method={order.method}
          />
        );
      })}
      {feedback.length == 0 && (
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
    </ScrollView>
  );
};

const renderScene = SceneMap({
  1: AllData,
  2: Delivery,
  3: Feedback,
});
const TabViewOrder = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Proses'},
    {key: '2', title: 'Sedang Antar'},
    {key: '3', title: 'Feedback'},
  ]);
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={styles.tabView}
    />
  );
};

export default TabViewOrder;

const styles = StyleSheet.create({
  tabView: {backgroundColor: 'white'},
  topBar: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  indicatorStyle: {
    backgroundColor: '#020202',
  },
  tabStyle: {elevation: 0},
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
});
