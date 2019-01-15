export const BREED_IMAGE_REQUEST = 'BREED_IMAGE_REQUEST';
export const BREED_IMAGE_SUCCESS = 'BREED_IMAGE_SUCCESS';
export const BREED_IMAGE_FAIL = 'BREED_IMAGE_FAIL';
export const INCREASE_SHOWED_IMAGES = 'INCREASE_SHOWED_IMAGES';

const NUMBER_OF_PICTURES = 4;

export const getBreedInfo = dogInfo => (dispatch) => {
  dispatch({
    type: BREED_IMAGE_REQUEST,
  });

  const getFullBreedPath = (dogInformation) => {
    if (dogInformation.subBreed) {
      return `${dogInformation.breed}/${dogInformation.subBreed}/`;
    }

    return `${dogInformation.breed}/`;
  };

  const getURLForImages = (dogInformation, quantity = null) => {
    const fullBreedPath = getFullBreedPath(dogInfo);

    if (quantity) {
      return `https://dog.ceo/api/breed/${fullBreedPath}images/random/${quantity}`;
    }
    return `https://dog.ceo/api/breed/${fullBreedPath}images`;
  };

  const dogImagesURL = getURLForImages(dogInfo, 20);

  fetch(dogImagesURL)
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'success') {
        const breedImages = data.message.map((it, index) => ({
          // API dogs отдает иногда одинаковые картинки
          // id: it.slice(it.lastIndexOf('_') + 1, it.lastIndexOf('.')),
          id: index,
          url: it,
        }));

        dispatch({
          type: BREED_IMAGE_SUCCESS,
          payload: breedImages,
        });
      } else {
        dispatch({
          type: BREED_IMAGE_FAIL,
          error: true,
          payload: new Error('Ошибка'),
        });
      }
    }).catch(() => {
      dispatch({
        type: BREED_IMAGE_FAIL,
        error: true,
        payload: new Error('Ошибка'),
      });
    });
};

export const increaseShowedImages = () => ({
  type: INCREASE_SHOWED_IMAGES,
  payload: NUMBER_OF_PICTURES,
});
