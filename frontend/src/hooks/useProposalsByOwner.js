import { useEffect, useState } from "react";
import { getProposalsByOwner } from "../components/inline/proposals";

export function useProposalsByOwner(ownerHash) {
    const [proposals, setProposals] = useState([]);
    useEffect(() => {
        (async () => {
            setProposals(await getProposalsByOwner(ownerHash));
        })();
    }, [ownerHash]);

    return proposals;
}