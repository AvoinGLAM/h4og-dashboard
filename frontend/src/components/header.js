import { useHistory } from "react-router-dom";

export function Header(props) {
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