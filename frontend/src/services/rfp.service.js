
const baseUri = import.meta.env.VITE_BASE_URL;

export const generateRfp = async (text) => {
    try {
        const response = await fetch(`${baseUri}/rfp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        if(!response.ok) {
            throw new Error('Failed to generate RFP');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
 }

export const fetchRfps = async () => {
    try {
        const response = await fetch(`${baseUri}/rfp`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if(!response.ok) {
            throw new Error('Failed to fetch RFPs');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    } 
}