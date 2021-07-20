//import postcards02Light from '../../assets/images/postcards_02_light.jpg';

import '../../styles/pages.css';
import '../../styles/cards.css';
import { defaultPictures } from '../../defaultPictures';
//import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { getDisplayTypeName } from '../../displayTypes';

import {
  Link,
} from "react-router-dom";

function ProjectsCard({ data }) {
    return (
      <Link to={`/${data.type}/${data.slug}/`} className="cardLink">
        <div className="projectsCard">
          <div className="picture">
            <img src={data.picture ? `//images.weserv.nl/?url=${data.picture}&w=348&h=348&fit=cover` : defaultPictures[data.defaultPictureIndex]} alt={`${data.name}`} />
          </div>
          <div className="content">
            <span className="cardType">{getDisplayTypeName(data.type)}</span>
  
            <h3>{data.name}</h3>
  
            <span>{data.description}</span>
          </div>
        </div>
      </Link>
    );
}

function ProjectsPage() {
    return (
      <div></div>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    card: ProjectsCard,
    page: ProjectsPage
}