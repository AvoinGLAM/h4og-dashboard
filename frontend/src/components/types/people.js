import '../../styles/pages.css';
import '../../styles/cards.css';

import { defaultPictures } from '../../defaultPictures';
//import Tippy from '@tippyjs/react';
//import 'tippy.js/dist/tippy.css'; // optional

import { getDisplayTypeName } from '../../displayTypes';

import postcards02Light from '../../assets/images/postcards_02_light.jpg';

import {
  Link,
} from "react-router-dom";

import { Socials, isSocialsEmpty } from '../inline/socials';
import { Proposals } from '../inline/proposals';
import { useProposalsByOwner } from '../../hooks/useProposalsByOwner';

function literalJoin(arr, con = 'and') {
    return arr.join(', ').replace(/, ([^,]*)$/, ` ${con} $1`);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export function PeopleCard({ data }) {
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
  const ownerProposals = useProposalsByOwner(data.ownerHash)
      .filter(proposal => proposal.type !== 'people');

  return (
      <div className="peoplePage page">
          <div className="container" style={{backgroundImage: "url('" + postcards02Light + "')"}}>
              <div className="center">
                  <div className="cardHeader">
                      <div className="picture">
                          <img src={data.picture ? `//images.weserv.nl/?url=${data.picture}&w=348&h=348&fit=cover` : defaultPictures[data.defaultPictureIndex]} alt={`${data.name}`} />
                      </div>
                      <div className="content">
                          <h3>{data.name} {data.lastName || ''}</h3>

                          {capitalize(`${data.companyRole || ''} from ${data.company.trim().length > 0 ? (data.city ? `${data.company} &` : '') : ''} ${data.city || ''}`)}

                          {data.skills.length > 0 ?
                          <span>{capitalize(literalJoin(data.skills))}</span>
                          : null}


                          {data.interests.length > 0 ?
                          <span>Let's talk about {literalJoin(data.interests, 'or')}</span>
                          : null}

                          <div className="tags">
                              {data.languages.map(lang => (
                                  <span>{lang}</span>
                              ))}
                          </div>

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
          <div className="center">
              {data.description.trim().length > 0 ?
                  <blockquote>{data.description}</blockquote>
                  : null }


              { isSocialsEmpty(data.social) ? null : <>
              <h3>Contact</h3>
              <Socials data={data.social} />
            </>}
            { ownerProposals.length > 0 ? <>
              <h3>Proposals</h3>
              <Proposals data={ownerProposals} />
            </> : null }
            
          </div> 
      </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    card: PeopleCard,
    page: PeoplePage
}