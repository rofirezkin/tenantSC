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
import CostumerTakeAway from '../CostumerTakeAway';
import CostumerDelivery from '../CostumerDelivery';
import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../../../utils';
import {
  getFeedbackOrder,
  getInProgress,
  getPastOrders,
} from '../../../redux/action';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.barTop}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused, color}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);
const AllData = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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

  console.log('inpror', inProgress);

  // const CostumerDineIn = ({foodName, is_active, name, quantity, status
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {inProgress.map(order => {
        const dataSubstring = [
          {desc: order.menu.ingredients, value: 40},
          {desc: order.menu.name, value: 25},
        ];
        var fixedDesc;
        var data = [];
        for (var i = 0; i < dataSubstring.length; i++) {
          if (dataSubstring[i].desc.length > dataSubstring[i].value) {
            fixedDesc =
              dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
              '...';
          } else {
            fixedDesc = dataSubstring[i].desc;
          }
          data.push({
            key: i,
            desc: fixedDesc,
          });
        }
        return (
          <CostumerDineIn
            id={order.id}
            kodeTransaksi={order.kode_transaksi}
            phone={order.phoneNumber}
            picturePath={order.menu.picturePath}
            category={order.menu.category}
            total={order.total}
            key={order.id}
            foodName={data[1].desc}
            is_active={order.menu.is_active}
            name={order.nama_pelanggan}
            quantity={order.quantity}
            status={order.status}
            method={order.method}
            price={order.menu.price}
            ingredients={data[0].desc}
          />
        );
      })}
    </ScrollView>
  );
};

const Delivery = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {feedback.map(order => {
        const dataSubstring = [
          {desc: order.menu.ingredients, value: 40},
          {desc: order.menu.name, value: 25},
        ];
        var fixedDesc;
        var data = [];
        for (var i = 0; i < dataSubstring.length; i++) {
          if (dataSubstring[i].desc.length > dataSubstring[i].value) {
            fixedDesc =
              dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
              '...';
          } else {
            fixedDesc = dataSubstring[i].desc;
          }
          data.push({
            key: i,
            desc: fixedDesc,
          });
        }
        return (
          <CostumerDineIn
            id={order.id}
            kodeTransaksi={order.kode_transaksi}
            phone={order.phoneNumber}
            picturePath={order.menu.picturePath}
            category={order.menu.category}
            total={order.total}
            key={order.id}
            foodName={data[1].desc}
            is_active={order.menu.is_active}
            name={order.nama_pelanggan}
            quantity={order.quantity}
            status={order.status}
            method={order.method}
            price={order.menu.price}
            ingredients={data[0].desc}
          />
        );
      })}
    </ScrollView>
  );
};
const PastOrder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState('');
  const {pastOrder} = useSelector(state => state.customerOrderReducer);
  const [refreshing, setRefreshing] = useState(false);

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
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {pastOrder.map(order => {
        const dataSubstring = [
          {desc: order.menu.ingredients, value: 40},
          {desc: order.menu.name, value: 25},
        ];
        var fixedDesc;
        var data = [];
        for (var i = 0; i < dataSubstring.length; i++) {
          if (dataSubstring[i].desc.length > dataSubstring[i].value) {
            fixedDesc =
              dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
              '...';
          } else {
            fixedDesc = dataSubstring[i].desc;
          }
          data.push({
            key: i,
            desc: fixedDesc,
          });
        }
        return (
          <CostumerDineIn
            id={order.id}
            kodeTransaksi={order.kode_transaksi}
            phone={order.phoneNumber}
            picturePath={order.menu.picturePath}
            category={order.menu.category}
            total={order.total}
            key={order.id}
            foodName={data[1].desc}
            is_active={order.menu.is_active}
            name={order.nama_pelanggan}
            quantity={order.quantity}
            status={order.status}
            method={order.method}
            price={order.menu.price}
            ingredients={data[0].desc}
          />
        );
      })}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  1: AllData,
  2: Delivery,
  3: PastOrder,
});
const TabViewOrder = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Proses'},
    {key: '2', title: 'Sedang Antar/Feedback'},
    {key: '3', title: 'Riwayat Order'},
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
  barTop: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  indicatorStyle: {
    backgroundColor: '#020202',
    marginLeft: 10,
  },
  tabStyle: {width: 'auto'},
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
});
