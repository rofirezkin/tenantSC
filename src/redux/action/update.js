import axios from 'axios';
import {setLoading} from './global';
import {API_HOST} from '../../config';
import {showMessage, storeData} from '../../utils';

export const updateMenuAction =
  (dataUploadMenu, dataId, token, dataPhoto, navigation) => dispatch => {
    axios
      .post(`${API_HOST.url}/menu/updateMenu/${dataId}`, dataUploadMenu, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('respon data', res.data.data.id);

        if (dataPhoto) {
          const idMenu = res.data.data.id;
          const photoForUpload = new FormData();
          photoForUpload.append('file', dataPhoto);
          axios
            .post(
              `${API_HOST.url}/menu/update/photo/${idMenu}`,
              photoForUpload,
              {
                headers: {
                  Authorization: token,
                  'Content-Type': 'multipart/form-data',
                },
              },
            )
            .then(resUpload => {
              navigation.reset({
                index: 0,
                routes: [{name: 'MainApp'}],
              });
              console.log('ress upload', resUpload);
              dispatch(setLoading(false));
            })
            .catch(err => {
              console.log('eror dimana0', err);
              dispatch(setLoading(false));
              showMessage(
                err?.response?.message || 'Uplaod photo tidak berhasil',
              );
            });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
          dispatch(setLoading(false));
        }
      })
      .catch(err => {
        console.log('eror dimana1', err.message);
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.data);
      });
  };

export const updateProfileAction =
  (data, token, dataPhoto, navigation) => dispatch => {
    console.log('data kantin', data);

    axios
      .post(`${API_HOST.url}/updateProfileTenant`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('respon data', res);
        const profile = res.data.data;

        if (dataPhoto) {
          const idMenu = res.data.data.id;
          const photoForUpload = new FormData();
          photoForUpload.append('file', dataPhoto);
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
                routes: [{name: 'MainApp'}],
              });
            })
            .catch(err => {
              console.log('eror dimana0', err);
              dispatch(setLoading(false));
              if (err.message) {
                showMessage(err.message);
                dispatch(setLoading(false));
              } else {
                showMessage(
                  err?.response?.message || 'Uplaod photo tidak berhasil',
                );
                dispatch(setLoading(false));
              }
            });
        } else {
          storeData('userProfile', profile);
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
          dispatch(setLoading(false));
        }
      })
      .catch(err => {
        if (err.message) {
          dispatch(setLoading(false));
          showMessage(err?.message);
        } else {
          dispatch(setLoading(false));
          showMessage(err?.response?.data?.data);
        }
      });
  };

export const updateStatusAction =
  (data, token, dataProfile, navigation) => dispatch => {
    axios
      .post(`${API_HOST.url}/tenant/update/status`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        dataProfile.status = res.data.data;
        showMessage(res.data.meta.message, 'success');
        storeData('userProfile', dataProfile);
        navigation.reset({
          index: 0,
          routes: [{name: 'MainApp'}],
        });
      })
      .catch(err => {
        console.log('erropor', err.response);
        showMessage(err?.response?.data);
      });
  };
