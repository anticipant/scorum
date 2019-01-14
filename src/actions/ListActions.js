export const BREEDS_LIST_REQUEST = 'BREEDS_LIST_REQUEST';
export const BREEDS_LIST_SUCCESS = 'BREEDS_LIST_SUCCESS';
export const BREEDS_LIST_FAIL = 'BREEDS_LIST_FAIL';
export const BREEDS_LIST_IMAGES_SUCCESS = 'BREEDS_LIST_IMAGES_SUCCESS';
export const BREEDS_LIST_IMAGES_FAIL = 'BREEDS_LIST_IMAGES_FAIL';

const URL = {
  BREEDS_LIST: 'https://dog.ceo/api/breeds/list/all',
  BREEDS_IMAGES: 'https://dog.ceo/api/breeds/image/random/10',
};

export const getBreedsList = () => (dispatch) => {
  dispatch({
    type: BREEDS_LIST_REQUEST,
  });

  fetch(URL.BREEDS_LIST)
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      if (data.status === 'success') {
        // console.log(data);
        const breedsObj = data.message;
        const breeds = Object.keys(breedsObj).map(key => ({
          [key]: breedsObj[key],
        }));

        dispatch({
          type: BREEDS_LIST_SUCCESS,
          payload: [...breeds],
        });
      } else {
        dispatch({
          type: BREEDS_LIST_FAIL,
          error: true,
          payload: new Error('Ошибка'),
        });
      }
    }).catch(() => {
      dispatch({
        type: BREEDS_LIST_FAIL,
        error: true,
        payload: new Error('Ошибка'),
      });
    });

  fetch(URL.BREEDS_IMAGES)
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'success') {
        const breedImages = data.message.map(it => ({
          id: it.slice(it.lastIndexOf('_') + 1, it.lastIndexOf('.')),
          url: it,
        }));

        dispatch({
          type: BREEDS_LIST_IMAGES_SUCCESS,
          payload: breedImages,
        });
      } else {
        dispatch({
          type: BREEDS_LIST_IMAGES_FAIL,
          error: true,
          payload: new Error('Ошибка'),
        });
      }
    }).catch(() => {
      dispatch({
        type: BREEDS_LIST_IMAGES_FAIL,
        error: true,
        payload: new Error('Ошибка'),
      });
    });
};
