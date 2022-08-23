import { BUTTON_TOGGLE } from '../actions/actionTypes';

const initialState = {
  buttonToggle: false,
};

const header = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
  case BUTTON_TOGGLE:
    return {
      ...state,
      buttonToggle: !state.buttonToggle,
    };
  default:
    return {
      ...state,
    };
  }
};

export default header;
