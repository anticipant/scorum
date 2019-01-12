import {
  BREEDS_LIST_REQUEST, BREEDS_LIST_SUCCESS, BREEDS_LIST_FAIL, REDIRECT_TO_DOG_PAGE,
} from '../actions/ListActions';

const initialState = {
  breeds: [],
  error: '',
  isFetching: false,
  referrer: null,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case BREEDS_LIST_REQUEST:
      return { ...state, isFetching: true, error: '' };

    case BREEDS_LIST_SUCCESS:
      return { ...state, isFetching: false, breeds: action.payload };

    case BREEDS_LIST_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };

    case REDIRECT_TO_DOG_PAGE:
      return {
        ...state,
        referrer: action.payload,
      };

    default:
      return state;
  }
};

export default listReducer;
