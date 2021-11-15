import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {
  foodCategory,
  ICAddPhoto,
  ICRemovePhoto,
  statusMenu,
} from '../../assets';
import {Button, Gap, Header, Select, TextInput} from '../../components';
import {setLoading, updateMenuAction} from '../../redux/action';

import useForm from '../../utils/useForm';

const EditMenu = ({navigation, route}) => {
  const dispatch = useDispatch();
  const dataMakanan = route.params.data;
  const dataId = route.params.data.id;
  const [photo, setPhoto] = useState({uri: route.params.data.picturePath});
  const token = route.params.token;
  const [dataPhoto, setDataPhoto] = useState();
  const priceFood = dataMakanan.price.toString();
  const [form, setForm] = useForm({
    category: dataMakanan.category,
    is_active: dataMakanan.is_active,
    price: priceFood,
    ingredients: dataMakanan.ingredients,
    name: dataMakanan.name,
  });

  const onSave = () => {
    dispatch(setLoading(true));
    dispatch(updateMenuAction(form, dataId, token, dataPhoto, navigation));
  };

  const addPhoto = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo');
        } else {
          const source = {uri: response.assets[0].uri};
          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          console.log('urri', response.assets[0]);
          setPhoto(source);
          setDataPhoto(dataImage);
        }
      },
    );
  };

  console.log('data makanan', dataMakanan);
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
            <TouchableOpacity onPress={addPhoto}>
              {photo ? (
                <View style={styles.borderPhoto}>
                  <Image source={photo} style={styles.photoContainer} />
                  <View style={styles.icAddPhoto}>
                    <ICRemovePhoto />
                  </View>
                </View>
              ) : (
                <View style={styles.borderPhoto}>
                  <View style={styles.photoContainer}>
                    <Text style={styles.addPhoto}>Tambahkan Foto Kantin</Text>
                  </View>
                  <View style={styles.icAddPhoto}>
                    <ICAddPhoto />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Select label="Kategori" />
            <Gap height={15} />
            <TextInput
              value={form.name}
              onChangeText={value => setForm('name', value)}
              label="Nama Menu Makanan/Minuman"
              placeholder="Isi Nama Menu anda"
            />
            <Gap height={15} />
            <TextInput
              value={form.price}
              onChangeText={value => setForm('price', value)}
              label="Harga"
              placeholder="isi Harga Menu anda"
              keyboardType="numeric"
            />
            <Gap height={15} />
            <Select
              label="Kategori Menu"
              value={form.category}
              onValueChange={value => setForm('category', value)}
              selectItem={foodCategory}
            />
            <Gap height={15} />
            <Select
              label="Status Menu"
              value={form.is_active}
              onValueChange={value => setForm('is_active', value)}
              selectItem={statusMenu}
            />
            <Gap height={15} />
            <TextInput
              label="Bahan bahan/ deskripsi"
              value={form.ingredients}
              onChangeText={value => setForm('ingredients', value)}
              underlineColorAndroid="transparent"
              placeholder="Tulis Penjelasan materi anda disini"
              placeholderTextColor="grey"
              numberOfLines={2}
            />
          </View>
          <Gap height={15} />
          <View>
            <Button onPress={onSave} label="Simpan" />
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
    width: 155,
    height: 120,
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 145,
    height: 110,
    borderRadius: 10,
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

  icAddPhoto: {position: 'absolute', bottom: 8, right: 1},
});
