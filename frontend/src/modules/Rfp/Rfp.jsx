import React, { useEffect } from "react";
import RfpList from "./components/RfpList";
import RfpView from "./components/RfpView";
import { useApi } from "../../hooks/useApi";
import useStore from "../../store/store";
import { fetchRfps } from "../../services/rfp.service";
import { fetchVendors } from "../../services/vendor.service";
import ProposalView from "../Proposal/ProposalView";

const Rfp = () => {
  const { loading, error, call } = useApi();

  const rfps = useStore((state) => state.rfps);
  const setRfps = useStore((state) => state.setRfps);
  const setSelectedRfp = useStore((state) => state.setSelectedRfp);
  const selectedRfp = useStore((state) => state.selectedRfp);
  const [vendors, setVendors] = React.useState([]);

  useEffect(() => {
    (async () => {
      const data = await call(fetchRfps);
      setRfps(data.rfps || []);
      const vendors = await call(fetchVendors);
      setVendors(vendors || []);
    })();
  }, []);

  return (
    <div className="h-full flex space-x-3 p-4">
      {/* RFP List */}
      <RfpList rfps={rfps} loading={loading} setSelectedRfp={setSelectedRfp} />
      {/* RFP View */}
      <RfpView rfp={selectedRfp} vendors={vendors}/>
      {/* proposal view */}
      <ProposalView rfp={selectedRfp} setSelectedRfp={setSelectedRfp}/>
    </div>
  );
};

export default Rfp;
