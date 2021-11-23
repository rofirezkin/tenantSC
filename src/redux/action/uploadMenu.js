import axios from 'axios';
import {setLoading} from './global';
import {API_HOST} from '../../config';
import {showMessage} from '../../utils';

export const uploadMenuAction =
  (dataUploadMenu, token, dataPhoto, navigation) => dispatch => {
    console.log('data upload', dataUploadMenu);
    axios
      .post(`${API_HOST.url}/menu/input`, dataUploadMenu, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('respon data', res.data.data.id);
        const idMenu = res.data.data.id;
        const photoForUpload = new FormData();
        photoForUpload.append('file', dataPhoto);
        axios
          .post(`${API_HOST.url}/menu/updatePhoto/${idMenu}`, photoForUpload, {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(resUpload => {
            navigation.reset({
              index: 0,
              routes: [{name: 'MainApp'}],
            });
            console.log('ress upload', resUpload);
            dispatch(setLoading(false));
          })
          .catch(err => {
            if (err.message) {
              dispatch(setLoading(false));
              showMessage(err.message);
            } else {
              dispatch(setLoading(false));
              showMessage(
                err?.response?.message || 'Uplaod photo tidak berhasil',
              );
            }
          });
      })
      .catch(err => {
        console.log('eerrr', err.message);
        if (err.message) {
          dispatch(setLoading(false));
          showMessage(err?.response?.data?.data);
        } else {
          dispatch(setLoading(false));
          showMessage(err?.response?.data?.data);
        }
      });
  };
