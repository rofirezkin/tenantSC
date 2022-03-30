import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack, ICNotif} from '../../../assets';

import {ProfileDummy} from '../../../assets';
import {API_HOST} from '../../../config';

const HomeProfile = ({data}) => {
  const navigation = useNavigation();
  const photoUser = {uri: `${API_HOST.storage}/${data.profile_photo_path}`};
  const photoDummy = {uri: data.profile_photo_url};

  return (
    <View style={styles.container}>
      <View>
        {photoUser.uri !== `${API_HOST.storage}/null` ? (
          <Image source={photoUser} style={styles.avatar} />
        ) : (
          <Image source={photoDummy} style={styles.avatar} />
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{data.nama_tenant}</Text>
        <Text style={styles.subtTitle}>{data.desc_kantin}</Text>
        <Text
          style={styles.status(
            data.status,
          )}>{`Status Kantin : ${data.status}`}</Text>
      </View>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Notification')}
        style={styles.notification}>
        <ICNotif />
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    flex: 1,
  },
  title: {fontSize: 19, fontFamily: 'Poppins-Medium', color: '#020202'},
  subtTitle: {fontSize: 14, fontFamily: 'Poppins-light', color: '#8D92A3'},
  back: {
    padding: 10,
    marginRight: 16,

    marginLeft: -10,
  },
  notification: {
    alignItems: 'flex-end',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginRight: 10,
  },
  status: status => ({
    color: status === 'active' ? 'green' : 'red',
  }),
});
