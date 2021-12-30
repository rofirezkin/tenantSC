// http://27.112.78.169/api/transactions/tenant/fetch?id_tenant=15&status=PENDING

import axios from 'axios';
import {setLoading} from '.';
import {API_HOST} from '../../config';
import {getData, showMessage} from '../../utils';

export const getInProgress = idTenant => async dispatch => {
  await getData('token').then(resToken => {
    const result = axios
      .all([
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?id_tenant=${idTenant}&status=PENDING`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        ),
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?id_tenant=${idTenant}&status=PROCESS`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          const pending = res1.data.data;
          const process = res2.data.data;
          // const onDelivery = res3.data.data;

          dispatch({
            type: 'SET_IN_PROGRESS',
            value: [...pending, ...process],
          });
        }),
      )
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on In Progress API` ||
            'Terjadi Kesalahan di In Progress API',
        );
      });
    return Promise.resolve(result);
  });
};

export const getFeedbackOrder = idTenant => async dispatch => {
  await getData('token').then(resToken => {
    const result = axios
      .all([
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?id_tenant=${idTenant}&status=ON DELIVERY`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        ),
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?id_tenant=${idTenant}&status=FEEDBACK`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          const onDelivery = res1.data.data;
          const feedback = res2.data.data;
          console.log('fsfsffs', res1, res2);
          // const onDelivery = res3.data.data;
          dispatch({
            type: 'SET_FEEDBACK',
            value: [...onDelivery, ...feedback],
          });
        }),
      )
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on In feedback api` ||
            'Terjadi Kesalahan di In feedback api',
        );
      });
    return Promise.resolve(result);
  });
};

export const getPastOrders = idTenant => async dispatch => {
  await getData('token').then(resToken => {
    const result = axios
      .all([
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?id_tenant=${idTenant}&status=CANCEL ORDER`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        ),
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?id_tenant=${idTenant}&status=DELIVERED`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          const cancelled = res1.data.data;
          const delivered = res2.data.data;

          dispatch({
            type: 'SET_PAST_ORDERS',
            value: [...delivered, ...cancelled],
          });
        }),
      )
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on In riwayat order api` ||
            'Terjadi Kesalahan di In feedback api',
        );
      });
    return Promise.resolve(result);
  });
};

export const progressOrder = (status, id, navigation) => async dispatch => {
  console.log('datadada', status, id);
  await getData('token').then(resToken => {
    axios
      .post(`${API_HOST.url}/transactions/tenant/updateStatus/${id}`, status, {
        headers: {
          Authorization: resToken.value,
        },
      })
      .then(res => {
        dispatch(setLoading(false));
        showMessage('data berhasil di update', 'success');
        console.log('ress', res);
        navigation.replace('MainApp', {screen: 'CostumerOrder'});
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage(
          `${err?.response?.data?.message} on order API` ||
            'Terjadi kesalahan dalam order',
        );
      });
  });
};
