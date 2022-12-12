import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  foodCategory,
  ICAddPhoto,
  ICRemovePhoto,
  menuCategory,
  statusKantin,
  statusMenu,
} from '../../assets';
import {
  Button,
  Gap,
  Header,
  InputCostum,
  Select,
  TextInput,
} from '../../components';
import useForm from '../../utils/useForm';
import {getData, showMessage} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, uploadMenuAction} from '../../redux/action';

const UploadMenu = ({navigation, route}) => {
  const dispatch = useDispatch();
  const id_tenant = route.params.userProfile.id;
  const kode_menu = route.params.kodeMenu;
  const token = route.params.token;
  const [photo, setPhoto] = useState('');
  const [dataPhoto, setDataPhoto] = useState({});
  const {isLoading} = useSelector(state => state.globalReducer);
  const [form, setForm] = useForm({
    name: '',
    category: 'Makanan',
    ingredients: '',
    is_active: 'Tersedia',
    price: '',
    category_menu: 'Recommended',
  });

  const onCounterChange = value => {
    const newValue = parseInt(value.replace(/\./g, ''), 10);
    setForm('price', newValue);
  };

  const onSubmit = () => {
    if (dataPhoto.uri) {
      const data = {
        ...form,
        id_tenant,
        kode_menu,
      };


      dispatch(setLoading(true));
      dispatch(uploadMenuAction(data, token, dataPhoto, navigation));
    } else {
      return showMessage('Anda Belum Upload foto');
    }
  };

  const addPhoto = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel || response.error) {
        showMessage('Anda tidak memilih photo');
      } else {
        const source = {uri: response.assets[0].uri};
        const dataImage = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };

        setPhoto(source);
        setDataPhoto(dataImage);
      }
    });
  };

  const backAction = () => {
    if (isLoading !== true) {
      navigation.goBack();
    }
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [isLoading]);
  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Upload Menu"
          subtTitle="Upload Menu di Toko Anda"
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
                    <Text style={styles.addPhoto}>Tambahkan Foto Menu</Text>
                  </View>
                  <View style={styles.icAddPhoto}>
                    <ICAddPhoto />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Gap height={15} />
            <TextInput value={kode_menu} label="Kode Menu" editable={false} />
            <Gap height={15} />
            <TextInput
              value={form.name}
              onChangeText={value => setForm('name', value)}
              label="Nama Menu Makanan/Minuman"
              placeholder="Isi Nama Menu anda"
            />
            <Gap height={15} />
            <InputCostum
              onValueChange={value => onCounterChange(value)}
              price={form.price}
              keyboardType="numeric"
              label="Harga"
              placeholder="misal : 20000"
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
            <Select
              label="Kategori Menu"
              value={form.category_menu}
              onValueChange={value => setForm('category_menu', value)}
              selectItem={menuCategory}
            />
            <Gap height={15} />

            <TextInput
              longInput
              label="Bahan Makanan"
              underlineColorAndroid="transparent"
              placeholder="Isi deskripsi singkat kantin"
              placeholderTextColor="grey"
              numberOfLines={2}
              onChangeText={value => setForm('ingredients', value)}
              value={form.ingredients}
            />
          </View>
          <Gap height={15} />
          <View>
            <Button label="Simpan" onPress={onSubmit} />
          </View>
          <Gap height={15} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadMenu;

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
    borderRadius: 20,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 140,
    height: 110,
    borderRadius: 20,
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
