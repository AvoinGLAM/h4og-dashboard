import { typeComponents } from '../displayTypes.js';
import { ErrorDialog } from './error.js';

import {
  useLocation,
} from "react-router-dom";
import { useCallback, useEffect, useState } from "react";


const localFilter = (data, filters) => {
  if (!filters) return data;

  return data.filter(item => {
    if (filters.type ? item.type !== filters.type : false) return false;
    if (filters.ownerHash ? item.ownerHash !== filters.ownerHash : false) return false;
    if (filters.slug ? item.slug !== filters.slug : false) return false;
    
    return item;
  })
};

export function Results({data, loadData}) {
    let {pathname} = useLocation();
    const getCurrentType = useCallback(() => pathname.slice(1) || '', [pathname]);

    const [filters, setFilters] = useState();

    useEffect(() => {
      setFilters({
        type: getCurrentType()
      })
    }, [getCurrentType]);

    useEffect(() => {
      loadData(filters)
    }, [filters, loadData]);

    const filteredData = localFilter(data, filters);

    if (filteredData.length > 0) {
      return (
        <div className="container resultGrid">
          {filteredData.map(item => {
            if (typeComponents[item.type] === undefined) {
              console.log(`Couldn't find component for type ${item.type}`);
              return typeComponents["ghost"].card();
            }
            return typeComponents[item.type].card({
              data: item
            });
          })}
        </div>
      ) 
    } else {
      return (
        <div className="container">
            <ErrorDialog>
                <h3>Couldn't find any results</h3>
                There may not be any content yet. Try broadening your filters.
            </ErrorDialog>
        </div>
      );
    }
}