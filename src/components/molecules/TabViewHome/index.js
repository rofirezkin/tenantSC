import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ItemListFood from '../ItemListFood';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../../../utils';
import {getFoodData} from '../../../redux/action';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.topBar}
    contentContainerStyle={{
      justifyContent: 'space-around',
    }}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused, color}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);

const All = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const {allFood} = useSelector(state => state.menuReducer);
  useEffect(() => {
    getData('token').then(res => {
      setToken(res.value);
      dispatch(getFoodData(res.value));
    });
  }, []);

  return (
    <View>
      {allFood.map(res => {
        const dataParams = {
          data: res,
          token,
        };
        return (
          <ItemListFood
            is_active={res.is_active}
            token={token}
            idFood={res.id}
            onPress={() => navigation.navigate('EditMenu', dataParams)}
            price={res.price}
            name={res.name}
            key={res.id}
            ingredients={res.ingredients}
            image={{uri: res.picturePath}}
          />
        );
      })}
    </View>
  );
};

const Food = () => {
  const navigation = useNavigation();
  const {food} = useSelector(state => state.menuReducer);
  const [token, setToken] = useState('');
  useEffect(() => {
    getData('token').then(res => {
      setToken(res.value);
    });
  }, []);

  return (
    <View>
      {food.map(res => {
        const dataParams = {
          data: res,
          token,
        };
        return (
          <ItemListFood
            token={token}
            idFood={res.id}
            onPress={() => navigation.navigate('EditMenu', dataParams)}
            price={res.price}
            name={res.name}
            key={res.id}
            ingredients={res.ingredients}
            image={{uri: res.picturePath}}
          />
        );
      })}
    </View>
  );
};
const Beverages = () => {
  const navigation = useNavigation();
  const {baverages} = useSelector(state => state.menuReducer);
  const [token, setToken] = useState('');
  useEffect(() => {
    getData('token').then(res => {
      setToken(res.value);
    });
  }, []);
  return (
    <View>
      {baverages.map(res => {
        const dataParams = {
          data: res,
          token,
        };
        return (
          <ItemListFood
            token={token}
            idFood={res.id}
            onPress={() => navigation.navigate('EditMenu', dataParams)}
            price={res.price}
            name={res.name}
            key={res.id}
            ingredients={res.ingredients}
            image={{uri: res.picturePath}}
          />
        );
      })}
    </View>
  );
};

const renderScene = SceneMap({
  1: All,
  2: Food,
  3: Beverages,
});
const TabViewHome = ({dataMenu}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Semua'},
    {key: '2', title: 'Makanan'},
    {key: '3', title: 'Minuman'},
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

export default TabViewHome;

const styles = StyleSheet.create({
  tabView: {backgroundColor: 'white'},
  topBar: {
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
  tabStyle: {elevation: 0},
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
});
