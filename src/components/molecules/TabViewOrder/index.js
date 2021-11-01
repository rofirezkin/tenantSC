import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import {CostumerDelivery} from '../CostumerDelivery';
import {CostumerDineIn} from '../CostumerDineIn';
import {CostumerTakeAway} from '../CostumerTakeAway';

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
const All = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <CostumerDineIn />
      <CostumerDineIn />
      <CostumerDineIn />
    </ScrollView>
  );
};

const DineIn = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <CostumerDineIn />
      <CostumerDineIn />
      <CostumerDineIn />
    </ScrollView>
  );
};

const TakeAway = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CostumerTakeAway />
    </View>
  );
};
const Delivery = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CostumerDelivery />
    </View>
  );
};

const renderScene = SceneMap({
  1: All,
  2: TakeAway,
  3: Delivery,
  4: DineIn,
});
const TabViewOrder = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'All'},
    {key: '2', title: 'Take Away'},
    {key: '3', title: 'Delivery'},
    {key: '4', title: 'Dine In'},
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
