import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, Select, TextInput} from '../../components';

const EditProfile = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Edit Profile"
          onPress={() => navigation.goBack()}
          subtTitle="Edit dan simpan profile anda"
          onBack={() => {}}
        />
        <View style={styles.container}>
          <View style={styles.photo}>
            <View style={styles.borderPhoto}>
              <View style={styles.photoContainer}>
                <Text style={styles.addPhoto}>Add Photo</Text>
              </View>
            </View>
          </View>
          <TextInput label="Nama Pemilik" placeholder="isi nama pemilik" />
          <Gap height={16} />
          <TextInput label="Nomor Hp" placeholder="Type your Email address" />
          <Gap height={16} />
          <TextInput
            label="Nama Kantin Anda"
            placeholder="Type your password"
          />
          <Gap height={16} />
          <Select label="Lokasi Kantin anda" />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your Email address"
          />
          <Gap height={16} />
          <Select label="Lokasi Kantin anda" />
          <Gap height={16} />

          <TextInput label="Nama Bank" placeholder="Type your Email address" />
          <Gap height={16} />
          <TextInput
            label="No Rekening bank"
            placeholder="Type your Email address"
          />
          <Gap height={24} />
          <Button
            label="Simpan"
            onPress={() => navigation.navigate('MainApp')}
          />
          <Gap height={13} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  addPhoto: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#8D92A3',
    width: 130,
    height: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  photoContainer: {
    width: 120,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
  },
});
