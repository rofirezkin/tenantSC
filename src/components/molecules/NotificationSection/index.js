import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ItemFood} from '../../../assets';

const NotificationSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={ItemFood} style={styles.avatar} />
        <View style={styles.cardText}>
          <Text style={styles.textStatus}>Dipesan</Text>
          <Text style={styles.desc}>
            Menu Ayam Bakar dipesan oleh pelanggan, berikan respons
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationSection;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  container: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: 19,
  },
  cardText: {
    flex: 1,
  },
  textStatus: {
    color: 'green',
    fontSize: 16,
  },
  desc: {
    color: '#8D92A3',
    fontSize: 15,
  },
});
