import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Button} from '../../atoms';
import {DummyList1, IMGDummyFoodCourt} from '../../../assets';
import {fonts} from '../../../utils';
import {ItemValue, Number} from '..';

import {useNavigation} from '@react-navigation/native';
import {API_HOST} from '../../../config';

const CostumerDineIn = ({
  foodName,
  total,
  name,
  category,
  quantity,
  status,
  ingredients,
  picturePath,
}) => {
  const navigation = useNavigation();
  // const shortDesc = method;
  // shortDesc.toString();
  // let fixedDesc = '';
  // if (shortDesc.length > 9) {
  //   fixedDesc = shortDesc.substring(0, 8);
  // } else {
  //   fixedDesc = shortDesc;
  // }

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{foodName}</Text>

        <View style={styles.description}>
          <View style={styles.prop1}>
            <Text style={styles.desc}>Jumlah : {quantity} Item</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.desc}>total : </Text>
              <Number style={styles.desc} number={total} />
            </View>
          </View>
        </View>
      </View>

      <Image
        source={{uri: `${API_HOST.storage}/${picturePath}`}}
        style={styles.image}
      />
      {/* <View>
            <Text style={styles.desc}>Kategori : {category}</Text>
            <Text style={styles.descStatus(status)}>Status : {status}</Text>
          </View> */}
    </View>
  );
};

export default CostumerDineIn;

const styles = StyleSheet.create({
  container: {
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
    color: 'green',
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

  prop1: {
    marginRight: 15,
  },
  buttonSection: {
    paddingHorizontal: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
});
