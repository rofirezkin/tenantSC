import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, TextInput} from '../../components';
import {showMessage} from '../../utils';
import useForm from '../../utils/useForm';

const SignUp = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
    nama_pemilik: '',
    nama_tenant: '',
    desc_kantin: '',
  });
  const [photo, setPhoto] = useState();
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (photo) {
      dispatch({type: 'SET_REGISTER', value: form});
      navigation.navigate('SignUpCanteen');
    } else {
      showMessage('Anda Belum Upload Foto');
    }
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
          dispatch({type: 'SET_PHOTO', value: dataImage});
          dispatch({type: 'SET_UPLOAD_STATUS', value: true});
        }
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <Header
          title="Sign Up"
          onPress={() => navigation.goBack()}
          subtTitle="Testing Signup"
          onBack={() => {}}
        />
        <View style={styles.container}>
          <View style={styles.photo}>
            <TouchableOpacity onPress={addPhoto}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  <Image source={photo} style={styles.photoContainer} />
                ) : (
                  <View style={styles.photoContainer}>
                    <Text style={styles.addPhoto}>Tambahkan Foto Kantin</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <TextInput
            value={form.email}
            onChangeText={value => setForm('email', value)}
            label="Email Address"
            placeholder="Type your Email address"
          />
          <Gap height={16} />
          <TextInput
            value={form.password}
            onChangeText={value => setForm('password', value)}
            label="Password"
            secureTextEntry={true}
            placeholder="Type your password"
          />

          <Gap height={16} />
          <TextInput
            value={form.nama_pemilik}
            onChangeText={value => setForm('nama_pemilik', value)}
            label="Nama Lengkap Pemilik kantin"
            placeholder="Isi Nama Lengkap disini"
          />
          <Gap height={16} />
          <TextInput
            value={form.nama_tenant}
            onChangeText={value => setForm('nama_tenant', value)}
            label="Nama Kantin/Tenant"
            placeholder="contoh : Kantin Lestari"
          />
          <Gap height={16} />

          <TextInput
            longInput
            label="Deskripsi singkat kantin"
            underlineColorAndroid="transparent"
            placeholder="Isi deskripsi singkat kantin"
            placeholderTextColor="grey"
            numberOfLines={2}
            multiline={true}
            onChangeText={value => setForm('desc_kantin', value)}
            value={form.desc_kantin}
          />
          <Gap height={24} />
          <Button label="Continue" onPress={onSubmit} />
          <Gap height={13} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
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
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  photoContainer: {
    width: 140,
    height: 110,
    borderRadius: 20,
    backgroundColor: '#F9EFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
