const initFilterOrder = {
  inProgress: [],
  pastOrder: [],
  feedback: [],
};
export const customerOrderReducer = (state = initFilterOrder, action) => {
  if (action.type === 'SET_IN_PROGRESS') {
    return {
      ...state,
      inProgress: action.value,
    };
  }
  if (action.type === 'SET_PAST_ORDERS') {
    return {
      ...state,
      pastOrder: action.value,
    };
  }
  if (action.type === 'SET_FEEDBACK') {
    return {
      ...state,
      feedback: action.value,
    };
  }

  return state;
};
