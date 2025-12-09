import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import {
  compareProposals,
  fetchProposalsByRfp,
} from "../../services/proposal.service";
import ProposalCard from "./components/ProposalCard";
import ProposalModal from "./components/ProposalModal";

const ProposalView = ({ rfp, setSelectedRfp }) => {
  const [proposals, setProposals] = React.useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const { loading, error, call } = useApi();

  useEffect(() => {
    (async () => {
      if (!rfp) return;
      const data = await call(fetchProposalsByRfp, rfp._id);
      setProposals(data || []);
    })();
  }, [rfp]);

  const handleCompare = async () => {
    try {

      if (!rfp) return;

      setCompareLoading(true);
      const data = await call(compareProposals, rfp._id);

      console.log("Comparison Result:", data);

      setProposals(data.proposals);
      setSelectedRfp(data.rfp);
    } catch (error) {}
    finally {
      setCompareLoading(false);
    }
  };

  const sortedProposals = rfp?.recommended_proposal_id
    ? [...proposals].sort((a, b) =>
        a._id === rfp.recommended_proposal_id ? -1 : 0
      )
    : proposals;

  if (!rfp) {
    return (
      <div
        className="h-[95%] flex-3 my-auto flex items-center justify-center 
        border border-white/10 rounded-xl text-white/50"
      >
        Select an RFP to view details
      </div>
    );
  }

  return (
    <div
      className="relative flex-5 h-[95%] my-auto
        border border-white/10 rounded-xl
        bg-[#1a1a1a] p-5 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Vendor Proposals</h2>

        <button
          onClick={handleCompare}
          disabled={compareLoading}
          className="px-4 py-2 text-sm rounded-lg
          bg-blue-600 hover:bg-blue-700
          transition text-white"
        >
          Comapre Proposals
        </button>
      </div>

      {compareLoading && (
        <p className="text-sm text-white/50 mb-4">
          Processing AI recommendation...
        </p>
      )}

      {proposals.length === 0 && !loading && (
        <p className="text-sm text-white/50">No proposals yet</p>
      )}

      {loading && !compareLoading && (
        <p className="text-sm text-white/60">Loading proposals...</p>
      )}

      {/* Proposal List */}
      <div className="grid grid-cols-1 gap-4">
        {sortedProposals.map((proposal) => (
          <ProposalCard
            key={proposal._id}
            proposal={proposal}
            isRecommended={rfp?.recommended_proposal_id === proposal._id}
            onView={() => setSelectedProposal(proposal)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProposal && (
        <ProposalModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
        />
      )}
    </div>
  );
};

export default ProposalView;
