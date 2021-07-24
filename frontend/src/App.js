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
import api from "./api";



function App() {

  const [data, setData] = useState([]);
  const [queryParams, setQueryParams] = useState({initial: true});

  useEffect(() => {
    (async () => {
      if (queryParams.initial === true) return;
    
      const results = await api.getResults(queryParams);
      setData(results);
    })();
  }, [queryParams])

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
