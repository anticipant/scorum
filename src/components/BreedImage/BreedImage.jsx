import PropTypes from 'prop-types';
import React from 'react';

const BreedImage = ({ imageInfo, name }) => {
  const { id, url } = imageInfo;
  return <img className={name} key={id} src={url} alt="dog" />;
};

BreedImage.propTypes = {
  imageInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

export default BreedImage;
