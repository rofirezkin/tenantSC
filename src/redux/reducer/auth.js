const initStateRegister = {
  email: '',
  password: '',
  nama_pemilik: '',
  nama_tenant: '',
  desc_kantin: '',
  device_token: '',
};

export const registerReducer = (state = initStateRegister, action) => {
  if (action.type === 'SET_REGISTER') {
    return {
      ...state,
      email: action.value.email,
      password: action.value.password,
      nama_pemilik: action.value.nama_pemilik,
      nama_tenant: action.value.nama_tenant,
      desc_kantin: action.value.desc_kantin,
    };
  }
  if (action.type === 'SET_DEVICE_TOKEN') {
    return {
      ...state,
      device_token: action.value,
    };
  }
  return state;
};

const initPhoto = {
  uri: '',
  type: '',
  name: '',
  isUploadPhoto: false,
};

export const photoReducer = (state = initPhoto, action) => {
  if (action.type === 'SET_PHOTO') {
    return {
      ...state,
      uri: action.value.uri,
      type: action.value.type,
      name: action.value.name,
    };
  }
  if (action.type === 'SET_UPLOAD_STATUS') {
    return {
      ...state,
      isUploadPhoto: action.value,
    };
  }

  return state;
};

const initIdTenant = {
  id_tenant: '',
};

export const idTenantReducer = (state = initIdTenant, action) => {
  if (action.type === 'SET_ID_TENANT') {
    return {
      ...state,
      id_tenant: action.value.id_tenant,
    };
  }

  return state;
};
