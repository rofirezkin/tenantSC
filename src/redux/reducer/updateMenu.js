const initUpdateMenu = {
  name: '',
  category: '',
  ingredients: '',
  price: '',
  is_active: '',
};

export const updateMenuReducer = (state = initUpdateMenu, action) => {
  if (action.type === 'SET_UPDATE_MENU') {
    return {
      ...state,
      id_tenant: action.value.id_tenant,
    };
  }

  return state;
};
