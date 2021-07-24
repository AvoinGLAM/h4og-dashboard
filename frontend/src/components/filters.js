import {
    useLocation,
  } from "react-router-dom";
import { useEffect, useState } from "react";

import { displayTypes } from '../displayTypes.js';
import { SelectButton } from '../components/input';
import postcards02Light from '../assets/images/postcards_02_light.jpg';

export function Filters({loadData}) {  
    let {pathname} = useLocation();
    const [filters] = useState({
      type: pathname.slice(1) || ''
    });

    useEffect(() => {
      loadData(filters)
    }, [filters, loadData]);
  
    return (
      <div className="container" style={{backgroundImage: "url('" + postcards02Light + "')"}}>
        <span>Display types</span>
        <div className="inputGroup selectGroup">
          {Object.keys(displayTypes).map((name) => (
            <SelectButton value={displayTypes[name]} selected={filters.type === displayTypes[name]}>{name}</SelectButton>
          ))}
        </div>
      </div>
    )
}