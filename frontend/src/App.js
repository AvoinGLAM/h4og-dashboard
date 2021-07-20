import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './styles/App.css';

import { displayTypes } from './displayTypes.js';
import { useEffect, useState } from "react";

import { Results } from './components/results.js';
import { Filters } from './components/filters.js';
import { Header } from './components/header.js';
import { DetailsPage } from './components/detailsPage.js';



function App() {

  const [data, setData] = useState([]);
  
  const baseResultsUrl = (process.env.NODE_ENV === 'development' ? 'http://localhost:80/api/results' : '/api/results');
  const [queryParams, setQueryParams] = useState({initial: true});

  useEffect(() => {
    if (queryParams.initial === true) return;
    
    const resultsUrl = `${baseResultsUrl}?${Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&')}`;

    console.log(resultsUrl)
    fetch(resultsUrl)
    .then(res => res.json())
    .then((json) => {
      console.log(json)
      setData(json);
    })
  }, [queryParams, baseResultsUrl])

  console.log(Object.values(displayTypes).map(val => `/${val}`))
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}`))]}>
            <Header />
            <Filters queryParams={queryParams} setQueryParams={setQueryParams} />
            <Results data={data} />
          </Route>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}/:slug`))]}>
            <Header backButton="Back to Results"/>
            <DetailsPage data={data} />
          </Route>
        </Switch>
      </div>
    </Router>    
  );
}

export default App;
