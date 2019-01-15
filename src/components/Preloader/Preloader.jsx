import React from 'react';
import './Preloader.scss';
import PropTypes from 'prop-types';

const Preloader = ({ children, isFetching, areImagesShowing = true }) => (
  <React.Fragment>
    {!areImagesShowing || isFetching ? (
      <div className="Preloader">
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
    ) : null }

    {isFetching ? null : children}
  </React.Fragment>
);

Preloader.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  areImagesShowing: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
Preloader.defaultProps = {
  areImagesShowing: true,
};

export default Preloader;
