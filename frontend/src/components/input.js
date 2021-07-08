import '../styles/selectButton.css';
import {
    Link,
  } from "react-router-dom";

export function SelectButton(props) {
    return (
      <div>
        <Link to={"/" + props.value}>
            <button className={"selectButton" + (props.selected ? " selected" : "")}>{props.children}</button>
        </Link>
      </div>
    )
}