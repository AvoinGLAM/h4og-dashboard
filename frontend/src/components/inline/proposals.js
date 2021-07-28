import api from "../../api";
import '../../styles/inline.css';
import { PeopleCard } from '../types/people';

export async function getProposalsByOwner(ownerHash) {
    const proposals = (await api.getResults({ownerHash})); 

    return proposals;
}

export function Proposals({data}) {
    return (
        <div className="proposals">
            {data.map((proposal) => (<PeopleCard data={proposal} />))}
        </div>
    );
}