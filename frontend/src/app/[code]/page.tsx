import api from "@/services/api";

interface Props {
  params: { code: string };
  searchParams: { countryName: string };
}

interface CountryInfo {
  countryCode: string;
  countryName: string;
  borderCountries: string[];
  populationData: { year: string; value: number }[];
  flagUrl: string;
}

export default async function CountryInfoPage({ params, searchParams }: Props) {
  const { code } = params;
  const countryName = searchParams.countryName;

  if (!countryName) {
    return <p>É necessário fornecer o parâmetro 'name'.</p>;
  }

  try {
    const response = await api.get(`/getCountryInfo/${code}?name=${countryName}`);
    const countryInfo: CountryInfo = response.data;

    return (
      <div>
        <h1>Informações sobre {countryInfo.countryName}</h1>
        <p>
          <strong>Código:</strong> {countryInfo.countryCode}
        </p>
        <p>
          <strong>Países Vizinhos:</strong> {countryInfo.borderCountries.join(", ")}
        </p>
        <p>
          <strong>População ao longo do tempo:</strong>
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
          alt={`Bandeira de ${countryInfo.countryName}`}
          width="200"
        />
      </div>
    );
  } catch (error) {
    console.error("Error to fetch country info:", error);
    return <p>Error to fetch country info.</p>;
  }
}
