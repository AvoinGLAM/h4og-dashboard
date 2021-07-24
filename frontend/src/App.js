import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './styles/App.css';

import { displayTypes } from './displayTypes.js';
import { useCallback, useState } from "react";

import { Results } from './components/results.js';
import { Filters } from './components/filters.js';
import { Header } from './components/header.js';
import { DetailsPage } from './components/detailsPage.js';
import api from "./api";

function App() {
  const [data, setData] = useState([]);

  const loadData = useCallback(async (queryParams) => {
    let newData = await api.getResults(queryParams);
    console.log('Loaded new data', newData)

    setData(d => {
      newData = newData.filter((i) => (
        !d.some(j => j.slug === i.slug)
      ));
      return [
        ...d,
        ...newData
      ];
    });
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}`))]}>
            <Header />
            <Filters loadData={loadData} />
            <Results data={data} />
          </Route>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}/:slug`))]}>
            <Header backButton="Back to Results"/>
            <DetailsPage data={data} loadData={loadData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
