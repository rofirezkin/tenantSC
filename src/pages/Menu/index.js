import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILEmptyMenu} from '../../assets';
import {
  Button,
  Gap,
  Header,
  ProfileFoodCourt,
  TabViewHome,
} from '../../components';

const Menu = ({navigation}) => {
  const [type, SetType] = useState(true);
  return (
    <View style={styles.page}>
      {type ? (
        <View style={styles.emptymenu}>
          <View>
            <ILEmptyMenu />
          </View>
          <Gap height={30} />
          <Text style={styles.title}>Oopps! tidak ada Menu</Text>
          <Gap height={6} />
          <Text style={styles.subTitle}>Ayo Upload Menu Makanan</Text>
          <Text style={styles.subTitle}>atau minuman untuk mahasiswa</Text>
          <Gap height={30} />
          <View style={styles.buttonContainer}>
            <Button
              label="Upload Menu"
              onPress={() => navigation.navigate('UploadMenu')}
            />
          </View>
        </View>
      ) : (
        <View style={styles.boxContent}>
          <Header title="SmartCanteen" subtTitle="Tenant SmartCanteen" notif />
          <View style={styles.contianer}>
            <ProfileFoodCourt />
          </View>
          <TabViewHome />
        </View>
      )}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  emptymenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    flex: 1,
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
  contianer: {
    backgroundColor: 'white',
    marginTop: 15,
    paddingHorizontal: 19,

    paddingTop: 15,
  },
});
