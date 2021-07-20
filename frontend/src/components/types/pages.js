import postcards02Light from '../../assets/images/postcards_02_light.jpg';
import { defaultPictures } from '../../defaultPictures';
import '../../styles/pages.css';

export function CollectionsPage({data}) {
    return (
        <div className="container" style={{backgroundImage: "url('" + postcards02Light + "')"}}>
            <div className="center">
                <div className="cardHeader">
                    <div className="picture">
                        
                    </div>
                    <div>
                        <h3>{data.name}</h3>
                    </div>
                </div>
            </div>
      </div>
    );
}

export function PeoplePage({data}) {
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
                            <span>{data.skills.join(', ')}</span>
                            {data.company.trim().length + data.city.trim().length === 0 ? '' :
                                <span>{data.company.trim().length === 0 ? '' : `${data.company}, `}{data.city}</span>
                            }
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
                {data.description}
            </div>
        </div>
    );
}

export function ProjectsPage() {
    return (
      <div></div>
    );
  }