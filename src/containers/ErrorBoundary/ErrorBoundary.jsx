import React from 'react';
import PropTypes from 'prop-types';
import './ErrorBoundary.scss';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="ErrorBoundary">
          <h1 className="ErrorBoundary__title">Something went wrong.</h1>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
