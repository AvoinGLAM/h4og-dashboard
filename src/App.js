import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import data from './data.json';


import './styles/App.css';
import { SelectButton } from './components/input';
import { People, Collections } from './components/cards';
import postcards02Light from './assets/images/postcards_02_light.jpg';

import { displayTypes } from './displayTypes.js';

function Filters() {  
  let {pathname} = useLocation();
  let displayType = pathname.slice(1) || '';

  return (
    <div className="container" style={{backgroundImage: "url('" + postcards02Light + "')"}}>
      <span>Display types</span>
      <div className="inputGroup selectGroup">
        {Object.keys(displayTypes).map((name) => (
          <SelectButton value={displayTypes[name]} selected={displayType === displayTypes[name]}>{name}</SelectButton>
        ))}
      </div>
    </div>
  )
}

function Results() {
  let {pathname} = useLocation();
  let displayType = pathname.slice(1);

  const typeComponents = {
    "people": People,
    "collections": Collections
  };

  /*const data = [
    {
      type: "people",
      name: "Elon Musk",
      skills: ["Entrepreneur", "Designer", "Programmer"],
      languages: ["en", "fr"],
      company: "SpaceX",
      city: "California",
      picture: "https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg"
    }
  ]*/
  //    Filter: {Object.keys(displayTypes).find(key => displayTypes[key] === displayType)}
  
  return (
    <div className="container resultGrid">
      {data.map(item => {
        if (typeComponents[item.type] === undefined) {
          console.log(`Couldn't find component for type ${item.type}`);
          return <></>;
        }
        return typeComponents[item.type]({
          data: item
        });
      })}
    </div>
  )
}
function App() {
console.log(data)

  console.log(Object.values(displayTypes).map(val => `/${val}`))
  return (
    <Router>
      <div className="App">
        <div className="header">
          <h1>Hack4OpenGLAM Dashboard</h1>
        </div>
        
        <Switch>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}`))]}>
            <Filters />
            <Results />
          </Route>
        </Switch>
      </div>
    </Router>    
  );
}

export default App;
