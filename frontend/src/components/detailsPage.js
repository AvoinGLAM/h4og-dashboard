import { typeComponents } from '../displayTypes.js';
import { useLocation, useParams } from "react-router-dom";

export function DetailsPage({data}) {
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