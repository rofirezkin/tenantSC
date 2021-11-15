import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack, ICNotif} from '../../../assets';
import {getData} from '../../../utils';
import {ProfileDummy} from '../../../assets';
import {API_HOST} from '../../../config';

const HomeProfile = () => {
  const navigation = useNavigation();
  const [profileUser, setProfileUser] = useState('');
  const [photoUser, setPhotoUser] = useState(ProfileDummy);
  const [photoDummy, setPhotoDummy] = useState();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('userProfile').then(res => {
        setProfileUser(res);
        setPhotoUser({
          uri: `${API_HOST.storage}/${res.profile_photo_path}`,
        });
        setPhotoDummy({uri: res.profile_photo_url});
      });
    });
  }, [navigation]);
  console.log('photourl', photoUser);

  return (
    <View style={styles.container}>
      <View>
        {photoUser.uri !== `${API_HOST.storage}/null` ? (
          <Image source={ProfileDummy} style={styles.avatar} />
        ) : (
          <Image source={photoDummy} style={styles.avatar} />
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{profileUser.nama_tenant}</Text>
        <Text style={styles.subtTitle}>{profileUser.desc_kantin}</Text>
        <Text
          style={styles.status(
            profileUser.status,
          )}>{`Status Kantin : ${profileUser.status}`}</Text>
      </View>
      <View style={styles.notification}>
        <ICNotif />
      </View>
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
  title: {fontSize: 19, fontFamily: 'Poppins-Medium', color: '#020202'},
  subtTitle: {fontSize: 14, fontFamily: 'Poppins-light', color: '#8D92A3'},
  back: {
    padding: 10,
    marginRight: 16,

    marginLeft: -10,
  },
  notification: {
    alignItems: 'flex-end',
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginRight: 10,
  },
  status: status => ({
    color: status === 'Buka' ? 'green' : 'red',
  }),
});
