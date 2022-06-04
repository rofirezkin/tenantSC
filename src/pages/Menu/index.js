import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {DummyIklan, ILEmptyMenu} from '../../assets';
import {
  Button,
  ButtonUploadMenu,
  CustomTab,
  Gap,
  Header,
  HomeProfile,
  ProfileFoodCourt,
  TabViewHome,
} from '../../components';
import {API_HOST} from '../../config';
import {getFoodData} from '../../redux/action';
import {fonts, getData, showMessage} from '../../utils';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {skeletonHome} from '../../components/skeleton/skeletonHome';

const Menu = ({navigation, routingData}) => {
  const [userProfile, setUserProfile] = useState('');
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [kodeMenu, setKodeMenu] = useState('');
  const {allFood} = useSelector(state => state.menuReducer);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setRefresh(true);
    getData('token').then(res => {
      dispatch(getFoodData(res.value));
    });
    setLoading(false);
    setRefresh(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false);

      // Assume a message-notification contains a "type" property in the data payload of the screen to open

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.data,
        );
        navigation.replace('MainApp', {screen: 'CostumerOrder'});
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            navigation.replace('MainApp', {screen: 'CostumerOrder'});
            setInitialRoute('MainApp'); // e.g. "Settings"
          }
        });
      getData('token').then(res => {
        setToken(res.value);
        dispatch(getFoodData(res.value));
        axios
          .get(`${API_HOST.url}/menu/getKodeMenu`, {
            headers: {
              Authorization: res.value,
            },
          })
          .then(res => {
            setKodeMenu(res.data.data);
          })
          .catch(err => {
            if (err.message) {
              // console.log('haloo food', err.message);
            }
          });
        return unsubscribe;
      });

      getData('userProfile').then(res => {
        console.log('ambil user profile ', res);
        setUserProfile(res);
        console.log('id', res);
      });
    });
    return unsubscribe;
  }, [token, navigation]);

  const dataParams = {
    userProfile,
    token,
    kodeMenu,
  };

  const uploadMenu = () => {
    if (userProfile.profile_photo_path == null) {
      Alert.alert(
        'Peringatan ',
        'Upss anda harus Upload Foto Profil Terlebih dahulu',
        [
          {
            onPress: () => navigation.navigate('MainApp', {screen: 'Profile'}),
          },
        ],
      );
    } else {
      navigation.navigate('UploadMenu', dataParams);
    }
  };
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <SkeletonContent
        containerStyle={{flex: 1}}
        isLoading={loading}
        layout={skeletonHome}>
        <View style={styles.page}>
          <HomeProfile data={userProfile} />
          {/* <View style={styles.balance}>
            <Text style={styles.label}>Saldo Saya : </Text>
            <Text style={styles.rupiah}>Rp200.000</Text>
          </View> */}
          {allFood.length < 1 ? (
            <View style={styles.emptymenu}>
              <View>
                <ILEmptyMenu />
              </View>
              <Gap height={30} />
              <Text style={styles.title}>Oopps! tidak ada Menu</Text>
              <Gap height={6} />
              <Text style={styles.subTitle}>Ayo Upload Menu Makanan</Text>
              <Text style={styles.subTitle}>
                atau minuman untuk mahasiswa/Dosen
              </Text>
              <Gap height={30} />
              <View style={styles.buttonContainer}>
                <Button label="Upload Menu" onPress={uploadMenu} />
              </View>
            </View>
          ) : (
            <View style={styles.boxContent}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.boxIklan}>
                  <Gap width={19} />
                  <Image source={DummyIklan} style={styles.iklan} />
                  <Image source={DummyIklan} style={styles.iklan} />
                </View>
              </ScrollView>
              <View style={styles.button}>
                <Gap height={19} />

                <ButtonUploadMenu label="Upload Menu" onPress={uploadMenu} />
              </View>
              <View style={{flex: 1}}>
                {/* <TabViewHome /> */}
                <CustomTab />
              </View>
            </View>
          )}
        </View>
      </SkeletonContent>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  balance: {
    paddingHorizontal: 20,
  },
  emptymenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    flex: 1,
  },

  label: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: '#666666',
  },
  rupiah: {
    fontSize: 26,
    color: '#666666',
    fontFamily: fonts.primary[600],
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[400],
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
  contianer: {
    backgroundColor: 'white',
    paddingHorizontal: 19,

    paddingTop: 15,
  },
  iklan: {
    width: 295,
    height: 115,
    marginRight: 19,
  },
  boxIklan: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 19,
  },
});
