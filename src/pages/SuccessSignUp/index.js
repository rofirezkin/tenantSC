import axios from 'axios';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILSuccessSignUp} from '../../assets/illustration';
import {Button, Gap} from '../../components';
import {API_HOST} from '../../config';
import {storeData} from '../../utils';

const SuccessSignUp = ({navigation, route}) => {
  const token = route.params;
  console.log(token);
  useEffect(() => {
    axios
      .get(`${API_HOST.url}/fetchtenant`, {
        headers: {
          Authorization: token.token,
        },
      })
      .then(res => {
        console.log('ress', res.data.data);
        storeData('userProfile', res.data.data);
      })
      .catch(err => {
        console.log('error', err.response);
      });
  });
  return (
    <View style={styles.page}>
      <View>
        <ILSuccessSignUp />
      </View>
      <Gap height={30} />
      <Text style={styles.title}>Yeeay! Completed</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Now you are able to order</Text>
      <Text style={styles.subTitle}>some foods as a self-reward</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          label="Find foods"
          onPress={() => navigation.replace('MainApp')}
        />
      </View>
    </View>
  );
};

export default SuccessSignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
});
