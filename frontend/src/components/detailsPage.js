import { typeComponents } from '../displayTypes.js';
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from 'react';

export function DetailsPage({data, loadData}) {
  const { slug } = useParams();
  const location = useLocation();
  const type = location.pathname.split('/')[1];
  const card = data.find(p => p.type === type && p.slug === slug);

  useEffect(() => {
    if (card) return;
    loadData({
      slug
    })
  }, [slug, loadData, card]);

  try {
    const TypeComponent = typeComponents[card.type].page;
    return <TypeComponent data={card} />;
  } catch (e) {
    return <></>;
  }
}