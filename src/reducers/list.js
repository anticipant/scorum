import {
  BREEDS_LIST_REQUEST,
  BREEDS_LIST_IMAGES_FAIL,
  BREEDS_LIST_IMAGES_SUCCESS,
  BREEDS_LIST_SUCCESS,
  BREEDS_LIST_FAIL,
} from '../actions/ListActions';

const initialState = {
  breeds: [],
  breedsImages: [],
  error: '',
  isFetchingList: false,
  isFetchingListImages: false,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case BREEDS_LIST_REQUEST:
      return {
        ...state, isFetchingList: true, isFetchingListImages: true, error: '',
      };

    case BREEDS_LIST_SUCCESS:
      return { ...state, isFetchingList: false, breeds: action.payload };

    case BREEDS_LIST_FAIL:
      return { ...state, isFetchingList: false, error: action.payload.message };

    case BREEDS_LIST_IMAGES_SUCCESS:
      return { ...state, isFetchingListImages: false, breedsImages: action.payload };

    case BREEDS_LIST_IMAGES_FAIL:
      return { ...state, isFetchingListImages: false, error: action.payload.message };

    default:
      return state;
  }
};

export default listReducer;
