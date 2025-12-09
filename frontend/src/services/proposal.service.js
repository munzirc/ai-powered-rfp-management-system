const baseUri = import.meta.env.VITE_BASE_URL;

export const fetchProposalsByRfp = async (rfpId) => {
  try {
    const response = await fetch(`${baseUri}/proposal/${rfpId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch proposals");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const compareProposals = async (rfpId) => {
  try {
    const response = await fetch(`${baseUri}/proposal/compare/${rfpId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to compare proposals");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
