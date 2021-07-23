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

function PeopleCard({ data }) {
    /*
    function prettifySkills(skills) {
      if (skills.length === 0) {
        return;
      } else if (skills.length === 1) {
        return skills[0];
      } else if (skills.length > 1) {
        let randomSkill = skills[Math.floor(Math.random() * skills.length)];
        return `${randomSkill}, +${skills.length - 1} more`
      }
    }*/
    return (
      <Link to={`/${data.type}/${data.slug}/`} className="cardLink">
        <div className="peopleCard">
          <div className="picture">
            <img src={data.picture ? `//images.weserv.nl/?url=${data.picture}&w=348&h=348&fit=cover` : defaultPictures[data.defaultPictureIndex]} alt={`${data.name}`} />
          </div>
          <div className="content">
            <span className="cardType">{getDisplayTypeName(data.type)}</span>
  
            <h3>{data.name}</h3>
  
            <span>{data.description}</span>
            {/*}
            {data.skills.length === 1 ?
              <span>{data.skills[0]}</span>
              :
              <Tippy content={data.skills.join(', ')}>
                <span>{prettifySkills(data.skills)}</span>
              </Tippy>
            }
            {data.company.trim().length + data.city.trim().length === 0 ? '' :
              <span>{data.company.trim().length === 0 ? '' : `${data.company}, `}{data.city}</span>
          }
            {data.company.trim().length > 0 ? 
            <span>{data.company}</span>
            :
            ''  
            }
            */}
          </div>
        </div>
      </Link>
    )
}

function PeoplePage({data}) {
    return (
        <div className="peoplePage page">
            <div className="container" style={{backgroundImage: "url('" + postcards02Light + "')"}}>
                <div className="center">
                    <div className="cardHeader">
                        <div className="picture">
                            <img src={data.picture ? `//images.weserv.nl/?url=${data.picture}&w=348&h=348&fit=cover` : defaultPictures[data.defaultPictureIndex]} alt={`${data.name}`} />
                        </div>
                        <div className="content">
                            <h3>{data.name}</h3>
                            {data.company.trim().length + data.city.trim().length === 0 ? '' :
                                <span class="from">from {data.company.trim().length === 0 ? '' : `${data.company} & `}{data.city}</span>
                            }
                            <span>I am {data.skills.join(', ')}</span>
                            <span>Let's talk about...</span>
                            <h4>My projects</h4>
                            <div class="smallcard">
                            <div className="picture smallpic">
                              <img src={defaultPictures[data.defaultPictureIndex]} alt={`${data.name}`} />
                            </div>
                            <div class="smallinfo">
                              <div class="cardType">project type</div>
                              <h3 class="cardName">Project name</h3>
                            </div>
                          </div>
                            <h4>Contact</h4>
                              <span>{data.social.website}</span>
                              <span>{data.social.twitter}</span>
                              <span>{data.social.github}</span>
                              <span>{data.social.facebook}</span>
                              <span>{data.social.instagram}</span>
                              <span>{data.social.flickr}</span>
                              <span>{data.social.linkedin}</span>
                              <span>{data.social.wikimedia}</span>
                        </div>
                        {/*
                        <div className="big">
                            <span>Local Time</span>
                            <span>13.28 PM</span>
                        </div>
                        */}
                    </div>
                </div>
            </div>
{/*             <div className="center">
                {data.description}
            </div> */}
        </div>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    card: PeopleCard,
    page: PeoplePage
}