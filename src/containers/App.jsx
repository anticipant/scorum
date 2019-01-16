import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import BreedsList from './BreedList/BreedsList';
import BreedPage from './BreedPage/BreedPage';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

const App = () => (
  <div className="app">
    <Router>
      <React.Fragment>

        <ErrorBoundary>
          <Route exact path="/" component={BreedsList} />
          <Route path="/dog/:breed/:subBreed?" component={BreedPage} />
        </ErrorBoundary>

      </React.Fragment>
    </Router>
  </div>
);

export default App;
