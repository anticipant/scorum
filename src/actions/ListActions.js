export const BREEDS_LIST_REQUEST = 'BREEDS_LIST_REQUEST';
export const BREEDS_LIST_SUCCESS = 'BREEDS_LIST_SUCCESS';
export const BREEDS_LIST_FAIL = 'BREEDS_LIST_FAIL';
export const REDIRECT_TO_DOG_PAGE = 'REDIRECT_TO_DOG_PAGE';

const URL = {
  BREEDS_LIST: 'https://dog.ceo/api/breeds/list/all',
};

// const getBreedInformation = (breedName) => {
//   const breedNames = breedName.split(' ');
//   if (breedNames.length === 1) {
//     return {
//       imageURL: `https://dog.ceo/api/breed/${breedNames[0]}/images`,
//       breed: breedNames[0],
//       subBreed: null,
//     };
//   }
//   return {
//     pageURL: `/${breedNames[1]}/${breedNames[0]}`,
//     imageURL: `https://dog.ceo/api/breed/${breedNames[1]}/${breedNames[0]}/images`,
//     breed: breedNames[0],
//     subBreed: breedNames[1],
//   };
// };

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

export const getBreedURL = (breedName) => {
  const breedNames = breedName.split(' ');
  const pageURL = breedNames.length === 1 ? `/${breedNames[1]}` : `/${breedNames[1]}/${breedNames[0]}`;

  return {
    type: REDIRECT_TO_DOG_PAGE,
    payload: pageURL,
  };
};
