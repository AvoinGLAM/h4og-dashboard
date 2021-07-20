import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useParams,
  useHistory
} from "react-router-dom";

import './styles/App.css';
import { SelectButton } from './components/input';
import postcards02Light from './assets/images/postcards_02_light.jpg';

import { displayTypes, typeComponents } from './displayTypes.js';
import { useEffect, useState } from "react";

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

function Results({data}) {
  //let {pathname} = useLocation();
  //let displayType = pathname.slice(1);
  //    Filter: {Object.keys(displayTypes).find(key => displayTypes[key] === displayType)}
  

  console.log(data);
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

function SinglePage({data}) {
  const { slug } = useParams();
  const location = useLocation();
  const type = location.pathname.split('/')[1];


  
  try {
    const card = data.find(p => p.type === type && p.slug === slug);
    console.log(card)
    return typeComponents[card.type].page({
      data: card
    });
  } catch (e) {
    return <></>;
  }
 
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
        <div>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc-ANlrZl9HDIYOP8d2MRzFK7v6WOuzNOpYxy2Roy-pgX3BOg/viewform">
              <button>Event Registration</button>
            </a>
        </div>
      }
    </div>
  )
}
function App() {

  const [data, setData] = useState([]);
  

  // Initial data load from the server
  useEffect(() => {
    const dataPath = (process.env.NODE_ENV == 'development' ? '/data.json' : '/api/results');
    console.log(dataPath);

    fetch(dataPath)
    .then(res => res.json())
    .then((json) => {
      console.log(json)
      setData(json);
    })
  }, [])

  console.log(Object.values(displayTypes).map(val => `/${val}`))
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}`))]}>
            <Header />
            <Filters />
            <Results data={data} />
          </Route>
          <Route exact path={[...(Object.values(displayTypes).map(val => `/${val}/:slug`))]}>
            <Header backButton="Back to Results"/>
            <SinglePage data={data} />
          </Route>
        </Switch>
      </div>
    </Router>    
  );
}

export default App;
