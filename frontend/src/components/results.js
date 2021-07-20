import { typeComponents } from '../displayTypes.js';
import { ErrorDialog } from './error.js';

export function Results({data}) {
    //let {pathname} = useLocation();
    //let displayType = pathname.slice(1);
    //    Filter: {Object.keys(displayTypes).find(key => displayTypes[key] === displayType)}
  
    if (data.length > 0) {
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