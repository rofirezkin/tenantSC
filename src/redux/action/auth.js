import axios from 'axios';
import {API_HOST} from '../../config';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';

export const signUpAction =
  (dataRegister, photoReducer, navigation) => dispatch => {
    axios
      .get(`${API_HOST.url}/tenant/idtenant`)
      .then(res => {
        dataRegister.id_tenant = res.data.data;

        axios
          .post(`${API_HOST.url}/tenantauth`, dataRegister)
          .then(res => {
            const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
            const profile = res.data.data.user;
            storeData('token', {value: token});
            if (photoReducer.isUploadPhoto) {
              const photoForUpload = new FormData();
              photoForUpload.append('file', photoReducer);

              axios
                .post(`${API_HOST.url}/tenant/photo`, photoForUpload, {
                  headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then(resUpload => {
                  console.log('res upload', resUpload);
                  profile.profile_photo_url = `${API_HOST.storage}/${resUpload.data.data[0]}`;
                  profile.profile_photo_path = `${resUpload.data.data[0]}`;
                  dispatch(setLoading(false));
                  storeData('userProfile', profile);
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'SuccessSignUp', params: {token}}],
                  });
                })
                .catch(err => {
                  showMessage(
                    err?.response?.message || 'Uplaod photo tidak berhasil',
                  );
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'SuccessSignUp', params: {token}}],
                  });
                });
            } else {
              dispatch(setLoading(false));
              storeData('userProfile', profile);
              navigation.reset({
                index: 0,
                routes: [{name: 'SuccessSignUp', params: {token}}],
              });
            }
          })
          .catch(err => {
            dispatch(setLoading(false));
            showMessage(err?.response?.data?.data?.message);
          });
      })
      .catch(err => {
        console.log('rwsssee', err);
        showMessage(err?.response?.data?.data?.message);
        dispatch(setLoading(false));
      });
  };

export const signInAction = (form, device_token, navigation) => dispatch => {
  dispatch(setLoading(true));
  console.log('device tokennn', form.email);
  console.log('device tokennn ni', device_token);
  axios
    .post(`${API_HOST.url}/tenantlogin`, form)
    .then(res => {
      const dataToken = {
        email: form.email,
        device_token: device_token,
      };

      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;
      axios
        .post(`${API_HOST.url}/tenant/update/device_token`, dataToken)
        .then(res => {
          dispatch(setLoading(false));
          storeData('token', {value: token});
          storeData('userProfile', profile);
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        })
        .catch(err => {
          console.log('error di update device_token  tenant ', err);
        });
    })
    .catch(err => {
      console.log('halo error', err);
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.data?.message);
    });
};
