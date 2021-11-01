const initStateRegister = {
  nama_pemilik: '',
  email: '',
  password: '',
};

export const registerReducer = (state = initStateRegister, action) => {
  if (action.type === 'SET_REGISTER') {
    return {
      ...state,
      nama_pemilik: action.value.nama_pemilik,
      email: action.value.email,
      password: action.value.password,
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
