import express, { Request, Response } from "express";
import { fetchAvailableCountries } from "./services/countriesService";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/getAvailableCountries", async (req: Request, res: Response) => {
  try {
    const countries = await fetchAvailableCountries();
    res.status(200).json(countries);
  } catch(error) {
    res.status(500).json({ message: "Error to list available countries" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
