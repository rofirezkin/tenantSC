import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import {ButtonEdit} from '../../atoms';
import {DummyList1, DummyMakanan, ICSampah, Next} from '../../../assets';

import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {API_HOST} from '../../../config';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../../redux/action';
import ModalsMenu from '../ModalsMenu';
import Number from '../Number';

const ItemListFood = ({
  onPress,
  idFood,
  price,
  ingredients,
  image,
  name,
  token,
  is_active,
}) => {
  const navigation = useNavigation();
  const [showWarningHarga, SetshowWarningHarga] = useState(false);
  const [showWarningStatus, SetshowWarningStatus] = useState(false);
  const dispatch = useDispatch();

  const editHarga = ({navigation}) => {
    SetshowWarningHarga(true);
  };
  const editStatus = () => {
    SetshowWarningStatus(true);
  };
  const onDelete = () => {
    //handler for Long Click
    Alert.alert(
      'Hapus Menu',
      'Apakah anda akan Hapus Menu ?',
      [
        {
          text: 'YA',
          onPress: handlerClick,
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onSavePrice = () => {
    console.log('halo');
  };

  const handlerClick = () => {
    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/menu/deleteMenu/${idFood}`, idFood, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        navigation.replace('MainApp');
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));
        console.log('errrrrrr', err);
      });
    //handler for Long Click
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.tabview}>
      <Image source={image} style={styles.avatar} />
      <View style={{flex: 1}}>
        <ModalsMenu
          type="harga"
          visible={showWarningHarga}
          onRequestClose={() => SetshowWarningHarga(false)}
          showWarningFalse={() => SetshowWarningHarga(false)}
          idMenu={idFood}
          price={price}
          token={token}
        />
        <ModalsMenu
          idMenu={idFood}
          onPressExit={() => SetshowWarningStatus(false)}
          type="status"
          visible={showWarningStatus}
          onRequestClose={() => SetshowWarningStatus(false)}
          showWarningFalse={() => SetshowWarningStatus(false)}
          token={token}
          is_active={is_active}
        />
        <View>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{ingredients}</Text>
              {/* <Text style={styles.subTitle}>
                Kantin Fak Teknik, Kantin Nasi Padang
              </Text> */}
              <View style={{flexDirection: 'row'}}>
                <Number number={price} style={styles.numberRating} />
                <Text style={styles.statusMenu(is_active)}>{is_active}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.boxChange}>
          <ButtonEdit onPress={editHarga} label="Ubah Harga" />
          <ButtonEdit onPress={editStatus} label="Ubah Status" />
          <TouchableOpacity onPress={onDelete} style={styles.sampah}>
            <ICSampah />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statusMenu: is_active => ({
    color: is_active === 'Tersedia' ? 'green' : 'red',
    marginLeft: 10,
  }),
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
  boxChange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sampah: {
    alignSelf: 'flex-end',
  },
});
