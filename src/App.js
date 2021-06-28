import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useParams,
  useHistory
} from "react-router-dom";

import data from './data.json';


import './styles/App.css';
import { SelectButton } from './components/input';
import postcards02Light from './assets/images/postcards_02_light.jpg';

import { displayTypes, typeComponents } from './displayTypes.js';

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
  //let {pathname} = useLocation();
  //let displayType = pathname.slice(1);
  //    Filter: {Object.keys(displayTypes).find(key => displayTypes[key] === displayType)}
  
  return (
    <div className="container resultGrid">
      {data.map(item => {
        if (typeComponents[item.type] === undefined) {
          console.log(`Couldn't find component for type ${item.type}`);
          return <></>;
        }
        return typeComponents[item.type].card({
          data: item
        });
      })}
    </div>
  )
}

function SinglePage() {
  const { slug } = useParams();
  const location = useLocation();
  const type = location.pathname.split('/')[1];

  const card = data.find(p => p.type === type && p.slug === slug);

  return typeComponents[card.type].page({
    data: card
  });
}

function Header(props) {
  const history = useHistory();

  return (
    <div className="header">
      <h1>Hack4OpenGLAM Dashboard</h1>
      {props.backButton ?
      <div>
        <button onClick={() => history.goBack()}>&lt; {props.backButton}</button>
      </div>
      :
      ''}
    </div>
  )
}
function App() {
  console.log(Object.values(displayTypes).map(val => `/${val}`))
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}`))]}>
            <Header />
            <Filters />
            <Results />
          </Route>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}/:slug`))]}>
            <Header backButton="Back to Results"/>
            <SinglePage />
          </Route>
        </Switch>
      </div>
    </Router>    
  );
}

export default App;
