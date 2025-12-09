const RfpList = ({ rfps, loading, setSelectedRfp }) => {
  return (
    <div className="flex-2 h-full overflow-y-auto">
      <h2 className="text-white text-lg font-semibold mb-4">RFPs</h2>

      {loading && (
        <p className="text-sm text-white/60">Loading RFPs...</p>
      )}

      {!loading && rfps.length === 0 && (
        <p className="text-sm text-white/50">No RFPs found</p>
      )}

      <div className="space-y-3">
        {rfps.map((rfp) => (
          <div
            key={rfp._id}
            className="flex items-start justify-between
              bg-[#222] border border-white/10
              rounded-xl px-4 py-3
              min-h-[68px]"
          >
            {/* Title */}
            <p
              className="text-xs text-white/90 font-medium
              line-clamp-2 break-words min-w-0 flex-1 mr-2"
            >
              {rfp.title}
            </p>

            {/* Action */}
            <button
              onClick={() => setSelectedRfp(rfp)}
              className="shrink-0 text-xs px-3 py-1.5 rounded-lg
                bg-white/10 hover:bg-white/20
                text-white transition"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RfpList;
