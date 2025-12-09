import ProposalScore from "./ProposalScore";

const ProposalCard = ({ proposal, isRecommended, onView }) => {
  const { vendor, ai_score, ai_summary, ai_verdict } = proposal;

  const scoreColor = 
    {
      Best_Choice: "#22c55e",
      Acceptable: "#facc15",
      Risky: "#f25c5c",
      Reject: "#ff0000",
    };

  return (
    <div className="relative bg-neutral-800 border border-white/10 rounded-xl p-4 hover:border-white/20 transition">
      {isRecommended && (
        <span className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
          Recommended
        </span>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-medium text-white">{vendor?.name}</p>
          <p className="text-xs text-white/50">{vendor?.email}</p>
        </div>

        {/* Circular score */}
        {typeof ai_score === "number" && ai_score > 0 && <ProposalScore score={ai_score} colour={scoreColor[ai_verdict.replace(" ", "_")]}/>}
      </div>

      {/* Verdict */}
      {ai_verdict && (
        <p className={`text-sm font-medium mb-1`} style={{ color: scoreColor[ai_verdict.replace(" ", "_")] }}>
          {ai_verdict}
        </p>
      )}

      {/* Summary */}
      {ai_summary && (
        <p className="text-xs text-white/70 line-clamp-3">{ai_summary}</p>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={onView}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProposalCard;
