const initMenu = {
  allFood: [],
  food: [],
  baverages: [],
};

export const menuReducer = (state = initMenu, action) => {
  if (action.type === 'SET_ALL_FOOD') {
    return {
      ...state,
      allFood: action.value,
    };
  }

  if (action.type === 'SET_FOOD') {
    return {
      ...state,
      food: action.value,
    };
  }

  if (action.type === 'SET_BAVERAGES') {
    return {
      ...state,
      baverages: action.value,
    };
  }

  return state;
};
