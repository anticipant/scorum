import React from 'react';
import './NavigationContainer.scss';
import PropTypes from 'prop-types';

const NavigationContainer = ({ children }) => <div className="NavigationContainer">{children}</div>;

NavigationContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationContainer;
