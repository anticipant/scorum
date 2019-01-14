import {
  BREED_IMAGE_REQUEST,
  BREED_IMAGE_SUCCESS,
  BREED_IMAGE_FAIL,
  INCREASE_SHOWED_IMAGES,
} from '../actions/PageActions';

const initialState = {
  error: '',
  isFetching: false,
  breed: null,
  subBreed: null,
  allImagesOfTheBreed: [],
  showedImages: 4,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BREED_IMAGE_REQUEST:
      return { ...state, isFetching: true, error: '' };

    case BREED_IMAGE_SUCCESS:
      return { ...state, isFetching: false, allImagesOfTheBreed: action.payload };

    case BREED_IMAGE_FAIL:
      return { ...state, isFetching: false, error: action.payload.message };

    case INCREASE_SHOWED_IMAGES:
      return { ...state, showedImages: state.showedImages + action.payload };

    default:
      return state;
  }
};

export default pageReducer;
