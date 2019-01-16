import { Link } from 'react-router-dom';
import React from 'react';
import './NavigationItem.scss';
import PropTypes from 'prop-types';

const NavigationItem = ({ label, path = '/' }) => <Link className="NavigationItem" to={path}>{label}</Link>;

NavigationItem.propTypes = {

  label: PropTypes.string.isRequired,
  path: PropTypes.string,
};

NavigationItem.defaultProps = {
  path: '/',
};

export default NavigationItem;
