import api from "@/services/api";
import Link from "next/link";

interface Props {
  params: { code: string };
  searchParams: { countryName: string };
}

interface CountryInfo {
  countryCode: string;
  countryName: string;
  borderCountries: { commonName: string, countryCode: string }[];
  populationData: { year: string; value: number }[];
  flagUrl: string;
}

export default async function CountryInfoPage({ params, searchParams }: Props) {
  const { code } = params;
  const countryName = searchParams.countryName;

  if (!countryName) {
    return <p>It's necessary to inform the param 'countryName'.</p>;
  }

  try {
    const response = await api.get(`/getCountryInfo/${code}?name=${countryName}`);
    const countryInfo: CountryInfo = response.data;

    return (
      <div>
        <h1>Information about {countryInfo.countryName}</h1>
        <p>
          <strong>Code:</strong> {countryInfo.countryCode}
        </p>
        <p>
          <strong>Border Countries:</strong> 
        </p>
        <ul>
          {countryInfo.borderCountries.map((data) => (
            <li key={data.commonName}>
              <Link href={`/${data.countryCode}?countryName=${data.commonName}`}>
                {data?.commonName} 
              </Link>
            </li>
          ))}
        </ul>
        <p>
          <strong>Population over time:</strong>
        </p>
        <ul>
          {countryInfo.populationData.map((data) => (
            <li key={data.year}>
              {data.year}: {data.value}
            </li>
          ))}
        </ul>
        <img
          src={countryInfo.flagUrl}
          alt={`Flag of ${countryInfo.countryName}`}
          width="200"
        />
      </div>
    );
  } catch (error) {
    console.error("Error to fetch country info:", error);
    return <p>Error to fetch country info.</p>;
  }
}
