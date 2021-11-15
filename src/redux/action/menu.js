import {showMessage} from '../../utils';

const {default: Axios} = require('axios');
const {API_HOST} = require('../../config');

export const getFoodData = token => dispatch => {
  Axios.get(`${API_HOST.url}/menu/fetchByTenant`, {
    headers: {
      Authorization: token,
    },
  })
    .then(res => {
      console.log('resss nya foood', res.data.data);
      const dataFood = res.data.data;
      const foodMenu = dataFood.filter(res => res.category === 'Makanan');
      const baveragesMenu = dataFood.filter(res => res.category === 'Minuman');
      dispatch({type: 'SET_FOOD', value: foodMenu});
      dispatch({type: 'SET_BAVERAGES', value: baveragesMenu});
      dispatch({type: 'SET_ALL_FOOD', value: res.data.data});
    })
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on Food API` ||
          'Terjadi kesalahan di API Food',
      );
    });
};



