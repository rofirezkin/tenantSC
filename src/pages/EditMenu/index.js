import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ICAddPhoto} from '../../assets';
import {Button, Gap, Header, Select, TextInput} from '../../components';

const EditMenu = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Edit Menu"
          subtTitle="Edit Menu Makanan dan Minuman Toko Anda"
          onBack
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.photo}>
            <View style={styles.borderPhoto}>
              <View style={styles.photoContainer}>
                <Text style={styles.addPhoto}>Add Photo</Text>
              </View>
              <View style={styles.icAddPhoto}>
                <ICAddPhoto />
              </View>
            </View>
          </View>
          <View>
            <Select label="Kategori" />
            <Gap height={15} />
            <TextInput
              label="Nama Menu Makanan/Minuman"
              placeholder="Isi Nama Menu anda"
            />
            <Gap height={15} />
            <TextInput label="Harga" placeholder="isi Harga Menu anda" />
            <Gap height={15} />
            <Select label="Status" />
            <Gap height={15} />
            <Select label="Deskripsi Atau Isi Menu" />
            <Gap height={15} />
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Tulis Penjelasan materi anda disini"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <Gap height={15} />
          <View>
            <Button label="Simpan" />
          </View>
          <Gap height={15} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditMenu;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  addPhoto: {
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
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,

    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  container: {
    flex: 1,
    paddingHorizontal: 19,
    paddingTop: 15,
    marginTop: 15,
    backgroundColor: 'white',
    margin: 2,
  },
  textArea: {
    borderRadius: 8,
    height: 200,
    padding: 10,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  icAddPhoto: {position: 'absolute', bottom: 8, right: 1},
});
