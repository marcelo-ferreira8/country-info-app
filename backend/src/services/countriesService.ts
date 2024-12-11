import axios from "axios"; 

export const fetchAvailableCountries = async () => {
    try {
        const response = await axios.get(`${process.env.NAGER_API_URL}/AvailableCountries`);
        return response.data;
    } catch(error) {
        console.log(error);
        throw new Error("Error to fetch available countries");
    }
}