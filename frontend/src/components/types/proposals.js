import { defaultPictures } from '../../defaultPictures';
import postcards02Light from '../../assets/images/postcards_02_light.jpg';
import { useProposalsByOwner } from '../../hooks/useProposalsByOwner';
import { Proposals } from '../inline/proposals';
import { isSocialsEmpty, Socials } from '../inline/socials';
import { RichText } from '../richText';

export const typeToSingular = (type) => ({
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
                      <span>{RichText(data.shortDescription || data.description)}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="center">
            { data.shortDescription ? ( data.description ? 
                <p style={{marginBottom: "2rem"}}>{RichText(data.description)}</p>
            : null ) : null}

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