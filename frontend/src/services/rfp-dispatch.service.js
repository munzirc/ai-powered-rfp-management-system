const baseUrl = import.meta.env.VITE_BASE_URL;

export const dispatchRfp = async (rfpId, vendorIds) => {
  try {
    const response = await fetch(`${baseUrl}/rfp-dispatch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rfpId, vendorIds }),
    }); 
    if (!response.ok) {
      throw new Error('Failed to dispatch RFP');
    } 
    return await response.json();
  } catch (error) {
    console.error('Error dispatching RFP:', error);
    throw error;
  }   
};