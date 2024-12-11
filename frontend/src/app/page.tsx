"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

interface Country {
  countryCode: string;
  name: string;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/getAvailableCountries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Available Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/${country.countryCode}?countryName=${country.name}`}>
              {country.name} ({country.countryCode})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
