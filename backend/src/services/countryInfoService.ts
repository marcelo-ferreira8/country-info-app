import axios from "axios";

type Response = {
    data: {
        commonName: String;
        officialName: String;
        countryCode: String;
        region: String;
        borders: [Response];
    }
};

export const fetchBorderCountries = async (countryCode: string) => {
    try {
        const response: Response = await axios.get(`${process.env.NAGER_API_URL}/CountryInfo/${countryCode}`);
        return response.data.borders || [];
    } catch(error) {
        console.error("Error to fetch border countries:", error);
        throw new Error("Error to fetch border countries informations.");
    }
};

export const fetchPopulationData = async (country: string) => { 
    try {
        const response: any = await axios.post(`${process.env.COUNTRIES_NOW_API_URL}/population`, {
            country,
        });
        return response.data.data.populationCounts || [];      
    } catch(error) {
        console.error("Error to fetch populational data:", error);
        throw new Error("Error to fetch populational data.");
    }
};

export const fetchCountryFlag = async (country: string) => {
    try {
      const response: any = await axios.post(`${process.env.COUNTRIES_NOW_API_URL}/flag/images`, {
        country,
      });
      return response.data.data.flag || "";
    } catch (error) {
      console.error("Error to fetch country flag:", error);
      throw new Error("Erro to fetch country flag.");
    }
};