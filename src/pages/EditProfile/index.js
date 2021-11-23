import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {ICAddPhoto, ICRemovePhoto, lokasiKantin} from '../../assets';
import {Button, Gap, Header, Select, TextInput} from '../../components';
import {API_HOST} from '../../config';
import {setLoading, updateProfileAction} from '../../redux/action';
import {showMessage} from '../../utils';
import useForm from '../../utils/useForm';

const EditProfile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.globalReducer);
  const dataProfile = route.params.userProfile;
  const token = route.params.token;
  const [photo, setPhoto] = useState({
    uri: `${API_HOST.storage}/${dataProfile.profile_photo_path}`,
  });
  const [dataPhoto, setDataPhoto] = useState();
  const [form, setForm] = useForm({
    nama_pemilik: dataProfile.nama_pemilik,
    nama_tenant: dataProfile.nama_tenant,
    no_telp: dataProfile.no_telp,
    lokasi_kantin: dataProfile.lokasi_kantin,
    nama_rekening: dataProfile.nama_rekening,
    no_rekening: dataProfile.no_rekening,
    nama_bank: dataProfile.nama_bank,
    desc_kantin: dataProfile.desc_kantin,
  });

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

  const onSave = () => {
    dispatch(setLoading(true));
    dispatch(updateProfileAction(form, token, dataPhoto, navigation));
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
          title="Edit Profile"
          onPress={() => navigation.goBack()}
          subtTitle="Edit dan simpan profile anda"
          onBack={() => {}}
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
          <TextInput
            label="Email Address"
            value={dataProfile.email}
            editable={false}
          />
          <Gap height={16} />
          <TextInput
            label="Nama Pemilik"
            value={form.nama_pemilik}
            onChangeText={value => setForm('nama_pemilik', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Nomor Hp"
            value={form.no_telp}
            onChangeText={value => setForm('no_telp', value)}
            keyboardType="numeric"
          />
          <Gap height={16} />
          <TextInput
            label="Nama Tenant Anda"
            value={form.nama_tenant}
            onChangeText={value => setForm('nama_tenant', value)}
          />
          <Gap height={16} />
          <Select
            value={form.lokasi_kantin}
            onValueChange={value => setForm('lokasi_kantin', value)}
            selectItem={lokasiKantin}
            label="Lokasi Tenant"
          />
          <Gap height={16} />
          <TextInput
            label="Nama Bank"
            value={form.nama_bank}
            onChangeText={value => setForm('nama_bank', value)}
          />
          <Gap height={16} />
          <TextInput
            label="No Rekening bank"
            value={form.no_rekening}
            onChangeText={value => setForm('no_rekening', value)}
            keyboardType="numeric"
          />
          <Gap height={16} />
          <TextInput
            value={form.desc_kantin}
            onChangeText={value => setForm('des_kantin', value)}
            label="deskripsi singkat Tenant"
            underlineColorAndroid="transparent"
            numberOfLines={2}
          />
          <Gap height={24} />
          <Button label="Simpan" onPress={onSave} />
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
  icAddPhoto: {position: 'absolute', bottom: 8, right: 1},
});
