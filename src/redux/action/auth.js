import axios from 'axios';
import {API_HOST} from '../../config';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';

export const signUpAction =
  (dataRegister, photoReducer, idTenantReducer, navigation) => dispatch => {
    console.log('id tenant', photoReducer);
    axios
      .get(`${API_HOST.url}/tenant/idtenant`)
      .then(res => {
        console.log('idTenat', res.data.data);
        dispatch(setLoading(false));

        dataRegister.id_tenant = res.data.data;
        console.log('data tenant', dataTenant);
        axios
          .post(`${API_HOST.url}/tenantauth`, dataTenant)
          .then(res => {
            console.log('accs', res);
            const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
            const profile = res.data.data.user;
            storeData('token', {value: token});
            if (photoReducer.isUploadPhoto) {
              // const photoForUpload = new FormData();
              // photoForUpload.append('file', photoReducer);
              // axios
              //   .post(`${API_HOST.url}/tenant/photo`, photoForUpload, {
              //     headers: {
              //       Authorization: token,
              //       'Content-Type': 'multipart/form-data',
              //     },
              //   })
              //   .then(resUpload => {
              //     console.log('res upload', resUpload);
              //     profile.profile_photo_url = `${API_HOST.storage}/${resUpload.data.data[0]}`;
              //     storeData('userProfile', profile);
              //     navigation.reset({
              //       index: 0,
              //       routes: [{name: 'SuccessSignUp'}],
              //     });
              //   })
              //   .catch(err => {
              //     showMessage(
              //       err?.response?.message || 'Uplaod photo tidak berhasil',
              //     );
              //     // navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
              //   });
            } else {
              storeData('userProfile', profile);
              // navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            }
            dispatch(setLoading(false));
          })
          .catch(err => {
            dispatch(setLoading(false));
            console.log('errorr', err);
            showMessage(err?.response?.data?.message);
          });
      })
      .catch(err => {
        console.log('halo ini kenapa', err);
        showMessage(err?.response?.data?.message);
        dispatch(setLoading(false));
      });
  };

export const signInAction = (form, navigation) => dispatch => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/tenantlogin`, form)
    .then(res => {
      console.log('halo', res);
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;
      dispatch(setLoading(false));
      storeData('token', {value: token});
      storeData('userProfile', profile);
      // navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch(err => {
      console.log('halo error', err);
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.data?.message);
    });
};
