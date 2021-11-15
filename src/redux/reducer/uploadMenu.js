
const initUploadMenu = {
  id_tenant: '',
  name: '',
  category: '',
  ingredients: '',
  price: '',
  is_active: '',
};

export const uploadMenuReducer = (state = initUploadMenu, action) => {
  if (action.type === 'SET_UPLOAD_MENU') {
    return {
      ...state,
      id_tenant: action.value.id_tenant,
      name: action.value.name,
      category: action.value.category,
      ingredients: action.value.ingredients,
      price: action.value.price,
      is_active: action.value.is_active,
    };
  }

  return state;
};

const initPhotoMenu = {
  uri: '',
  type: '',
  name: '',
  isUploadPhoto: false,
};

export const photoMenuReducer = (state = initPhotoMenu, action) => {
  if (action.type === 'SET_PHOTO_MENU') {
    return {
      ...state,
      uri: action.value.uri,
      type: action.value.type,
      name: action.value.name,
    };
  }
  if (action.type === 'SET_UPLOAD_STATUS_MENU') {
    return {
      ...state,
      isUploadPhoto: action.value,
    };
  }
  return state;
};
