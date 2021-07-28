import { defaultPictures } from '../../defaultPictures';
import postcards02Light from '../../assets/images/postcards_02_light.jpg';
import { useProposalsByOwner } from '../../hooks/useProposalsByOwner';
import { Proposals } from '../inline/proposals';
import { isSocialsEmpty, Socials } from '../inline/socials';

const typeToSingular = (type) => ({
    "people": "person",
    "projects": "project",
    "collections": "collection",
    "tools": "tool",
    "workshops": "workshop"
}[type] || 'project');

export function ProposalsPage({data}) {
    const ownerProposals = useProposalsByOwner(data.ownerHash);
    const ownerData = ownerProposals.filter(proposal => proposal.type === 'people');

    const links = {
        ...data.links,
        "slack": `https://community.okf.fi/hack4openglam/channels/${typeToSingular(data.type)}-${data.slug}`    
    };

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

                      {/*
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
                      */}
                    </div>
                </div>
            </div>
        </div>
        <div className="center">
            { isSocialsEmpty(links) ? null : <>
              <h3>Links</h3>
              <Socials data={links} />
            </>}

            {ownerData.length > 0 ? <>
                <h3>Contact</h3>
                <Proposals data={ownerData} />
            </> : null}
        </div>
      </div>
    );
}