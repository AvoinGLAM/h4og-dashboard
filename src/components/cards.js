import '../styles/cards.css';
import { avatars } from '../avatars';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

export function Collections({ data }) {
  console.log(data);
  return (
    <div className="collectionsCard">
      moi
    </div>
  )
}
export function People({ data }) {
  function prettifySkills(skills) {
    if (skills.length === 0) {
      return;
    } else if (skills.length === 1) {
      return skills[0];
    } else if (skills.length > 1) {
      let randomSkill = skills[Math.floor(Math.random() * skills.length)];
      return `${randomSkill}, +${skills.length - 1} more`
    }
  }
  return (
      <div className="peopleCard">
        <div className="picture">
          <img src={data.picture ? `//images.weserv.nl/?url=${data.picture}&w=308&h=348&fit=cover` : avatars[data.defaultAvatarIndex]} alt={`${data.name}`} />
        </div>
        <div className="content">
          <h3>{data.name}</h3>

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
        </div>
    </div>
  )
}