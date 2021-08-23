import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../layout/Home/Home';
import './App.scss';

const MovieDetails = lazy(() =>
  import('./../components/MovieDetails/MovieDetails')
);

function App() {
  return (
    <div className='App'>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/movie-details/:movieId' component={MovieDetails} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
