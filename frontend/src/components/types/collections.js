import '../../styles/cards.css';
import '../../styles/pages.css';

import { defaultPictures } from '../../defaultPictures';
//import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { getDisplayTypeName } from '../../displayTypes';

import postcards02Light from '../../assets/images/postcards_02_light.jpg';

import {
  Link,
} from "react-router-dom";

function CollectionsCard({ data }) {
    console.log(data);
    return (
      <Link to={`/${data.type}/${data.slug}/`} className="cardLink">
        <div className="collectionsCard">
          <div className="picture">
              <img src={data.media.thumbnail ? `//images.weserv.nl/?url=${data.media.thumbnail}&w=308&h=348&fit=cover` : defaultPictures[data.defaultPictureIndex]} alt={`${data.name}`} />
            </div>
            <div className="content">
              <span className="cardType">{getDisplayTypeName(data.type)}</span>
              <h3>{data.name}</h3>
              <span>{data.shortDescription}</span>
            </div>
        </div>
      </Link>
    )
}

function CollectionsPage({data}) {
    return (
        <div className="container" style={{backgroundImage: "url('" + postcards02Light + "')"}}>
            <div className="center">
                <div className="cardHeader">
                    <div className="picture">
                        
                    </div>
                    <div>
                        <h3>{data.name}</h3>
                        <span>{data.description.trim().length === 0 ? data.shortDescription : data.description}</span>
                    </div>
                </div>
            </div>
      </div>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    card: CollectionsCard,
    page: CollectionsPage
};