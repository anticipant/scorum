import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import BreedsList from '../components/BreedList/BreedsList';
import BreedPage from '../components/BreedPage';

const App = () => (
  <div className="app">
    <Router>
      <React.Fragment>

        <Route exact path="/" component={BreedsList} />
        <Route path="/dog/:breed/:subBreed?" component={BreedPage} />

      </React.Fragment>
    </Router>
  </div>
);

export default App;
