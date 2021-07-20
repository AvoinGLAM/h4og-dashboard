import {
    useLocation,
  } from "react-router-dom";
import { useEffect } from "react";

import { displayTypes } from '../displayTypes.js';
import { SelectButton } from '../components/input';
import postcards02Light from '../assets/images/postcards_02_light.jpg';

export function Filters({queryParams, setQueryParams}) {  
    let {pathname} = useLocation();
    let displayType = pathname.slice(1) || '';
  
    useEffect(() => {
      const newQueryParams = {};
      if (displayType !== '') newQueryParams.type = displayType;
  
      if (JSON.stringify(queryParams) === JSON.stringify(newQueryParams)) return;
      setQueryParams(newQueryParams)
    }, [displayType, queryParams, setQueryParams]);
  
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