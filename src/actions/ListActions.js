export const BREEDS_LIST_REQUEST = 'BREEDS_LIST_REQUEST';
export const BREEDS_LIST_SUCCESS = 'BREEDS_LIST_SUCCESS';
export const BREEDS_LIST_FAIL = 'BREEDS_LIST_FAIL';

const URL = {
  BREEDS_LIST: 'https://dog.ceo/api/breeds/list/all',
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
};
