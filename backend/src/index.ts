import express, { Request, Response } from "express";
import { fetchAvailableCountries } from "./services/countriesService";
import * as dotenv from "dotenv";
import { fetchBorderCountries, fetchCountryFlag, fetchPopulationData } from "./services/countryInfoService";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());

app.get("/api/getAvailableCountries", async (req: Request, res: Response) => {
  try {
    const countries = await fetchAvailableCountries();
    res.status(200).json(countries);
  } catch(error) {
    res.status(500).json({ message: "Error to list available countries" });
  }
});

app.get("/api/getCountryInfo/:code", async (req: Request, res: Response) => {
    const countryCode = req.params.code.toUpperCase();
    const countryName = req.query.name as string;   

    try {
        const borderCountries = await fetchBorderCountries(countryCode);
        const populationData = await fetchPopulationData(countryName);
        const flagUrl = await fetchCountryFlag(countryName);
        res.status(200).json({
            countryCode,
            countryName,
            borderCountries,
            populationData,
            flagUrl,
        })
    } catch(error) {
      res.status(500).json({ message: "Error to gather country info"});
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
