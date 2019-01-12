import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import BreedsList from '../components/BreedsList';
import BreedPage from '../components/BreedPage';

const App = () => (
  <div className="app">
    <Router>
      <React.Fragment>

        <Route exact path="/" component={BreedsList} />
        <Route path="/dog/:breed/:subBreed" component={BreedPage} />
        {/* <Route path="/table-results" component={Results} /> */}

      </React.Fragment>
    </Router>
  </div>
);

export default App;
