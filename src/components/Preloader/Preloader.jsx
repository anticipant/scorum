import React from 'react';
import './Preloader.scss';

const Preloader = ({ children, isFetching }) => {
  if (isFetching) {
    return (
      <div className="Preloader">
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
    );
  }
  return children;
};

export default Preloader;
