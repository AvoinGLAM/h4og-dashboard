//import postcards02Light from '../../assets/images/postcards_02_light.jpg';

import '../../styles/pages.css';
import '../../styles/cards.css';
import { defaultPictures } from '../../defaultPictures';
//import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { getDisplayTypeName } from '../../displayTypes';

import postcards02Light from '../../assets/images/postcards_02_light.jpg';

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
  
            <span>{data.shortDescription}</span>
          </div>
        </div>
      </Link>
    );
}

function ProjectsPage({data}) {
    return (
      <div className="projectsPage page">
        <div className="container" style={{backgroundImage: "url('" + postcards02Light + "')"}}>
            <div className="center">
                <div className="cardHeader">
                    <div className="picture">
                    <img src={data.media.thumbnail ? `//images.weserv.nl/?url=${data.media.thumbnail}&w=348&h=348&fit=cover` : defaultPictures[data.defaultPictureIndex]} alt={`${data.name}`} />
                </div>
                    <div className="content">
                      <h3>{data.name}</h3> 
                      <span>{data.description}</span>
                      <h4>Contact</h4>
                      <div className="smallcard">
                        <div className="picture smallpic">
                          <img src={defaultPictures[data.defaultPictureIndex]} alt={`${data.name}`} />
                        </div>
                        <div className="smallinfo">
                          <h3 className="cardName">Name</h3>
                          <span className="from">from company & city</span>
                        </div>
                      </div>
                      <h4>Links</h4>
                      <span><a href={data.links.homepage} target="blank">Homepage</a></span>
                      <span><a href={data.links.codebase} targer="blank">Codebase</a></span>
                      <div className="cta">
                        <a href={"https://community.okf.fi/hack4openglam/channels/project-" + data.slug} target="blank">
                          <button>Join the project channel!</button>
                        </a>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    card: ProjectsCard,
    page: ProjectsPage
}