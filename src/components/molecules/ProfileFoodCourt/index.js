import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMGDummyFoodCourt, ProfileDummy} from '../../../assets';
import {API_HOST} from '../../../config';
import {getData} from '../../../utils';
import Rating from '../Rating';

const ProfileFoodCourt = () => {
  const navigation = useNavigation();
  const [profileUser, setProfileUser] = useState('');
  const [photoUser, setPhotoUser] = useState(ProfileDummy);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('userProfile').then(res => {
        setProfileUser(res);
        console.log('reddss', res);
        setPhotoUser({
          uri: `${API_HOST.storage}/${res.profile_photo_path}`,
        });
      });
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {photoUser.uri !== `${API_HOST.storage}/null` ? (
        <Image source={photoUser} style={styles.image} />
      ) : (
        <Image source={ProfileDummy} style={styles.image} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{profileUser.nama_tenant}</Text>
        <Text style={styles.description}>{profileUser.desc_kantin}</Text>
        <Rating />
      </View>
    </View>
  );
};

export default ProfileFoodCourt;

const styles = StyleSheet.create({
  image: {
    width: 81,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
    maxWidth: '90%',
  },
  textContainer: {
    marginLeft: 14,
  },
  statusText: {
    color: '#1CBD49',
    fontSize: 14,
  },
});
