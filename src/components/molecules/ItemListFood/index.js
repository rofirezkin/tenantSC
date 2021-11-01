import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ButtonEdit} from '../../atoms';
import {DummyList1, Next} from '../../../assets';

const ItemListFood = ({
  onPress,
  date,
  statusOrder,
  price,
  type,
  items,
  totalOrder,
  rating,
}) => {
  const renderContent = () => {
    switch (type) {
      case 'product':
        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Soup Bumil</Text>
              <Text style={styles.subTitle}>Nasi, Telur, Ayam ...</Text>
              <Text style={styles.subTitle}>
                Kantin Fak. Teknik, Foodcourt A
              </Text>
              <Text style={styles.subTitle}>
                {items} Item . Rp{totalOrder}
              </Text>
            </View>
            <View>
              <ButtonEdit />
            </View>
          </View>
        );

      case 'in-progress':
        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Soup Bumil</Text>
              <Text style={styles.subTitle}>Nasi, Telur, Ayam ...</Text>
              <Text style={styles.statusInProgress}>Process</Text>
              <Text style={styles.subTitle}>
                {items} Item . Rp{totalOrder}
              </Text>
            </View>
            <View>
              <Next />
            </View>
          </View>
        );

      case 'past-orders':
        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Soup Bumil</Text>
              <Text style={styles.subTitle}>Nasi, Telur, Ayam ...</Text>
              <Text style={styles.subTitle}>
                Kantin Fak. Teknik, Foodcourt A
              </Text>
              <Text style={styles.subTitle}>
                {items} Item . Rp{totalOrder}
              </Text>
            </View>
            <View>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.statusOrder(statusOrder)}>{statusOrder}</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Soup Bumil</Text>
              <Text style={styles.subTitle}>Nasi, Telur, Ayam ...</Text>
              <Text style={styles.subTitle}>
                Kantin Fak.xx Teknik, Foodcourt A
              </Text>
              <Text style={styles.subTitle}>Rp20.000</Text>
            </View>
            <View>
              <ButtonEdit onPress={onPress} />
            </View>
          </View>
        );
      //item product
    }
  };
  return (
    <View style={styles.tabview}>
      <Image source={DummyList1} style={styles.avatar} />
      {renderContent()}
    </View>
  );
};

export default ItemListFood;

const styles = StyleSheet.create({
  tabview: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 9,
    alignItems: 'center',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'black',
  },
  statusInProgress: {
    color: '#00A61B',
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
  },
  container: {
    marginLeft: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  statusOrder: statusOrder => ({
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: statusOrder === 'Cancelled' ? '#D9435E' : '#1ABC9C',
  }),
});
