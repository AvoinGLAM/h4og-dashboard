import {
    useLocation,
  } from "react-router-dom";
import { useCallback } from "react";

import { displayTypes } from '../displayTypes.js';
import { SelectButton } from '../components/input';
import postcards02Light from '../assets/images/postcards_02_light.jpg';

export function Filters() {  
    let {pathname} = useLocation();
    const getCurrentType = useCallback(() => pathname.slice(1) || '', [pathname]);
   
    return (
      <div className="container" style={{backgroundImage: "url('" + postcards02Light + "')"}}>
        <span>Display types</span>
        <div className="inputGroup selectGroup">
          {Object.keys(displayTypes).map((name) => (
            <SelectButton value={displayTypes[name]} selected={getCurrentType() === displayTypes[name]}>{name}</SelectButton>
          ))}
        </div>
      </div>
    )
}