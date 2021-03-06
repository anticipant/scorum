import {
  BREEDS_LIST_REQUEST,
  BREEDS_LIST_IMAGES_FAIL,
  BREEDS_LIST_IMAGES_SUCCESS,
  BREEDS_LIST_SUCCESS,
  BREEDS_LIST_FAIL,
  IMAGE_RENDERED,
} from '../actions/ListActions';

const initialState = {
  breeds: [],
  breedsImages: [],
  error: '',
  isLoadedList: false,
  isLoadedListImages: false,
  isFetchingList: false,
  isFetchingListImages: false,
  areImagesShowing: false,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case BREEDS_LIST_REQUEST:
      return {
        ...state,
        isFetchingList: true,
        isFetchingListImages: true,
        error: '',
        areImagesShowing: false,
      };

    case BREEDS_LIST_SUCCESS:
      return {
        ...state,
        isFetchingList: false,
        isLoadedList: true,
        breeds: action.payload,
      };

    case BREEDS_LIST_FAIL:
      return {
        ...state,
        isFetchingList: false,
        error: action.payload.message,
      };

    case BREEDS_LIST_IMAGES_SUCCESS:
      return {
        ...state,
        isFetchingListImages: false,
        isLoadedListImages: true,
        breedsImages: action.payload,
      };

    case BREEDS_LIST_IMAGES_FAIL:
      return {
        ...state,
        isFetchingListImages: false,
        error: action.payload.message,
      };

    case IMAGE_RENDERED:
      return {
        ...state,
        areImagesShowing: true,
      };

    default:
      return state;
  }
};

export default listReducer;
