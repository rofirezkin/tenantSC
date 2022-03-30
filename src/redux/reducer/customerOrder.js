const initFilterOrder = {
  inProgress: [],
  pastOrder: [],
  delivery: [],
  feedback: [],
  inProgressBadges: [],
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
  if (action.type === 'SET_DELIVERY') {
    return {
      ...state,
      delivery: action.value,
    };
  }
  if (action.type === 'SET_FEEDBACK') {
    return {
      ...state,
      feedback: action.value,
    };
  }
  if (action.type === 'SET_IN_PROGRESS_BADGES') {
    return {
      ...state,
      inProgressBadges: action.value,
    };
  }

  return state;
};
