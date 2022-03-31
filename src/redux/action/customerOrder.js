// http://27.112.78.169/api/transactions/tenant/fetch?id_tenant=15&status=PENDING

import axios from 'axios';
import {setLoading} from '.';
import {API_HOST} from '../../config';
import {getData, showMessage} from '../../utils';
import {setLoadingSkeleton} from './global';

export const getInProgress = idTenant => async dispatch => {
  dispatch(setLoadingSkeleton(true));
  await getData('token').then(resToken => {
    const result = axios
      .all([
        axios.get(`${API_HOST.url}/transactions/tenant/fetch?status=PENDING`, {
          headers: {
            Authorization: resToken.value,
          },
        }),
        axios.get(`${API_HOST.url}/transactions/tenant/fetch?status=PROCESS`, {
          headers: {
            Authorization: resToken.value,
          },
        }),
      ])
      .then(
        axios.spread((res1, res2) => {
          const pending = res1.data.data;
          const process = res2.data.data;
          console.log('ddaddadsds', res1.data);
          // const onDelivery = res3.data.data;
          dispatch(setLoadingSkeleton(false));

          dispatch({
            type: 'SET_IN_PROGRESS',
            value: [...pending, ...process],
          });
        }),
      )
      .catch(err => {
        dispatch(setLoadingSkeleton(false));
        if (err?.message) {
          showMessage(err?.message);
        } else {
          showMessage(
            `${err?.response?.data?.message} on In Progress API` ||
              'Terjadi Kesalahan di In Progress API',
          );
        }
      });
    return Promise.resolve(result);
  });
};

export const getDeliveryOrder = idTenant => dispatch => {
  dispatch(setLoadingSkeleton(true));
  getData('token').then(resToken => {
    axios
      .get(`${API_HOST.url}/transactions/tenant/fetch?status=ON DELIVERY`, {
        headers: {
          Authorization: resToken.value,
        },
      })
      .then(resDelivery => {
        dispatch(setLoadingSkeleton(false));
        console.log('ress delive', resDelivery.data.data);
        const deliveryData = resDelivery.data.data;
        dispatch({type: 'SET_DELIVERY', value: deliveryData});
      })
      .catch(err => {
        dispatch(setLoadingSkeleton(false));
        if (err?.message) {
          showMessage(err?.message);
        } else {
          showMessage(
            `${err?.response?.data?.message} on Delivery API` ||
              'Terjadi Kesalahan di Delivery API',
          );
        }
      });
  });
};

export const getFeedbackOrder = () => dispatch => {
  getData('token')
    .then(resToken => {
      axios
        .get(`${API_HOST.url}/transactions/tenant/fetch?status=FEEDBACK`, {
          headers: {
            Authorization: resToken.value,
          },
        })
        .then(resFeedback => {
          console.log('respon feedback', feedback);
          const feedback = resFeedback.data.data;
          dispatch({type: 'SET_FEEDBACK', value: feedback});
        })
        .catch(err => {
          dispatch(setLoading(false));
          if (err?.message) {
            showMessage(err?.message);
          } else {
            showMessage(
              `${err?.response?.data?.message} on In Feedback API` ||
                'Terjadi Kesalahan di In Feedback API',
            );
          }
        });
    })
    .catch(err => {
      dispatch(setLoading(false));
      console.log('err', err);
      showMessage('eror get token');
    });
};

export const getPastOrders = idTenant => async dispatch => {
  dispatch(setLoadingSkeleton(true));
  await getData('token').then(resToken => {
    const result = axios
      .all([
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?status=CANCEL ORDER`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        ),
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?status=DELIVERED`,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          dispatch(setLoadingSkeleton(false));
          console.log('dsss', res1.data.data);
          const cancelled = res1.data.data;
          const delivered = res2.data.data;

          dispatch({
            type: 'SET_PAST_ORDERS',
            value: [...delivered, ...cancelled],
          });
        }),
      )
      .catch(err => {
        dispatch(setLoadingSkeleton(false));
        if (err?.message) {
          showMessage(err?.message);
        } else {
          showMessage(
            `${err?.response?.data?.message} on In Past Order API` ||
              'Terjadi Kesalahan di In Past API',
          );
        }
      });
    return Promise.resolve(result);
  });
};

export const progressOrder =
  (status, kodeTransaksi, deviceToken, notif, namaTenant, navigation) =>
  async dispatch => {
    console.log('kodetransaksi', deviceToken);
    const notifData = {
      to: deviceToken,
      collapse_key: 'type_a',
      notification: {
        android: {
          sound: 'default',
        },
        android_channel_id: 'default-channel-id',
        title: 'Konfirmasi Pesanan',
        body: `Pesanan Anda dalam status : ${status.status} oleh ${namaTenant} `,
      },
    };
    const notifJSON = JSON.stringify(notifData);
    console.log('notifjson', notifJSON);
    await getData('token').then(resToken => {
      axios
        .post(
          `${API_HOST.url}/transactions/tenant/updateStatus?kode_transaksi=${kodeTransaksi}&status=${status}`,
          status,
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        )
        .then(res => {
          axios
            .post(`https://fcm.googleapis.com/fcm/send`, notifJSON, {
              headers: {
                'Content-Type': 'application/json',
                Authorization:
                  'key=AAAAmc0dakQ:APA91bECUaR9WbE_tTHJkSJ2KlcYbGThlF-h8RoQDAdgZerbZPIkbV3UKsn1Pg-Nto24LAd32cerbsf8JZQ7lUbfzFV7GxgocRSZNkA18ksUiLZoDWHZmhDB_HPKB8Vh2mWXd-cvelH0',
              },
            })
            .then(res => {
              notif.localNotif();
              dispatch(setLoading(false));
              showMessage('data berhasil di update', 'success');

              navigation.replace('MainApp', {screen: 'CostumerOrder'});
            })
            .catch(err => {
              dispatch(setLoading(false));
              if (err?.message) {
                showMessage(err?.message);
              } else {
                showMessage(
                  'ada masalah pada data kantin, hubungi admin (device token)',
                );
              }

              console.log('testing notif err', err);
            });
        })
        .catch(err => {
          if (err?.message) {
            showMessage(err?.message);
          } else {
            showMessage(
              `${err?.response?.data?.message} on progress order API` ||
                'Terjadi Kesalahan di Progress order API',
            );
          }
        });
    });
  };

export const getInProgressBadges = nim => async dispatch => {
  getData('token').then(resToken => {
    const result = axios

      .all([
        axios.get(`${API_HOST.url}/transactions/tenant/fetch?status=PENDING`, {
          headers: {
            Authorization: `Bearer ${resToken.value}`,
          },
        }),
        axios.get(`${API_HOST.url}/transactions/tenant/fetch?status=PROCESS`, {
          headers: {
            Authorization: `Bearer ${resToken.value}`,
          },
        }),
        axios.get(
          `${API_HOST.url}/transactions/tenant/fetch?status=ON DELIVERY`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        ),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          const pending = res1.data.data;
          const process = res2.data.data;
          const onDelivery = res3.data.data;

          dispatch({
            type: 'SET_IN_PROGRESS_BADGES',
            value: [...onDelivery, ...process, ...pending],
          });
        }),
      )
      .catch(err => {
        if (err?.message) {
          showMessage(err?.message);
        } else {
          showMessage(
            `${err?.response?.data?.message} on\ Badges API` ||
              'Terjadi Kesalahan di In Badges APi',
          );
        }
      });
    return Promise.resolve(result);
  });
};
