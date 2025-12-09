const baseUrl = import.meta.env.VITE_BASE_URL;

export const createVendor = async (vendorData) => {
  try {
    const response = await fetch(`${baseUrl}/vendor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendorData),
    });

    if (!response.ok) {
      throw new Error("Failed to create vendor");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchVendors = async () => {
  try {
    const response = await fetch(`${baseUrl}/vendor`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch vendors");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteVendor = async (vendorId) => {
  try {
    const response = await fetch(`${baseUrl}/vendor/${vendorId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to delete vendor");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateVendor = async (vendorId, vendorData) => {
  try {
    const response = await fetch(`${baseUrl}/vendor/${vendorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendorData),
    });
    if (!response.ok) {
      throw new Error("Failed to update vendor");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
