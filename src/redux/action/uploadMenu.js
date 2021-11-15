import axios from 'axios';
import {setLoading} from '.';
import {API_HOST} from '../../config';
import {showMessage} from '../../utils';

export const uploadMenuAction =
  (dataUploadMenu, token, dataPhoto, navigation) => dispatch => {
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
            console.log('eror dimana0', err);
            dispatch(setLoading(false));
            showMessage(
              err?.response?.message || 'Uplaod photo tidak berhasil',
            );
          });
      })
      .catch(err => {
        console.log('eror dimana1', err.response);
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.data);
      });
  };
