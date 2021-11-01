import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Button} from '../../atoms';
import {DummyList1, IMGDummyFoodCourt} from '../../../assets';
import {fonts} from '../../../utils';

const CostumerDineIn = () => {
  const {height, width} = useWindowDimensions();
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.wrapperText}>
          <View style={styles.cardTitle}>
            <Text style={styles.title}>Chicken Katsu</Text>
            <Text style={styles.statusMenu}>Available</Text>
          </View>
          <Text style={styles.menuContent}>Nasi, Telur, Ayam, Sambal ..</Text>
          <View style={styles.description}>
            <View style={styles.prop}>
              <Text style={styles.desc}>Nama Pembeli</Text>
              <Text style={styles.desc}>No. Meja</Text>
              <Text style={styles.desc}>Jumlah</Text>
              <Text style={styles.desc}>Status</Text>
            </View>
            <View>
              <Text style={styles.desc}>Ratu Utami</Text>
              <Text style={styles.desc}>B10</Text>
              <Text style={styles.desc}>4 Item</Text>
              <Text style={styles.statusPelanggan}>Menunggu</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardImage}>
          <Image source={IMGDummyFoodCourt} style={styles.image} />
          <View>
            <Text style={styles.price}>Total : Rp15.000</Text>
            <Text style={styles.desc}>Kategori : Makanan</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonSection}>
        <Button costumerOrder label="Konfirmasi" />
        <Button costumerOrder label="Prosess" />
        <Button costumerOrder label="diantar" />
        <Button costumerOrder label="sudah diantar" />
      </View>
    </View>
  );
};

export default CostumerDineIn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
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
  statusMenu: {
    marginLeft: 7,
    textAlignVertical: 'bottom',
    fontSize: 10,
    fontFamily: fonts.primary[400],
    color: '#2B9F61',
    maxWidth: '80%',
  },
  description: {
    flexDirection: 'row',
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
  wrapperText: {},
  cardImage: {
    alignItems: 'flex-end',
  },
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
