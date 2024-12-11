"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import api from "@/services/api";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CountryInfo {
  countryCode: string;
  countryName: string;
  borderCountries: { commonName: string, countryCode: string }[];
  populationData: { year: string; value: number }[];
  flagUrl: string;
}

export default function CountryInfoPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  const [countryInfo, setCountryInfo] = useState<CountryInfo>();

  useEffect(() => {
    const fetchCountryInfo = async () => {
      const code = params ? params.code : null;
      const countryName = searchParams ? searchParams.get("countryName") : null;
      
      if (code && countryName) {
        const response = await api.get(`/getCountryInfo/${code}?name=${countryName}`);
        setCountryInfo(response.data)
      } else {
        console.log("Error")
      }
    };

    fetchCountryInfo(); 
  }, [params, searchParams]);
  
  if (!countryInfo?.countryName || !countryInfo?.countryCode) {
    return <p>Loading...</p>;
  }

  const chartConfig = {
    year: {
      label: "Year",
      color: '#2563eb'
    },
    value: {
      label: "value",
      color: '#232323'
    
    }
  } satisfies ChartConfig

  const chartData = countryInfo.populationData.map((data) => {
    return {year: data.year, value: data.value }
   })
  
  try {
    return (
      <div>
         <h1 style={{ display: 'flex', alignItems: 'center' }}>
          Information about {countryInfo.countryName}
          <img
            src={countryInfo.flagUrl}
            alt={`Flag of ${countryInfo.countryName}`}
            style={{ width: '40px', height: 'auto', marginRight: '10px' }}
          />
        </h1>
        <p>
          <strong>Code:</strong> {countryInfo?.countryCode}
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
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Population 1960 - 2018</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toString().slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="#232323"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
        </ChartContainer>
      </div>
    );
  } catch (error) {
    console.error("Error to fetch country info:", error);
    return <p>Error to fetch country info.</p>;
  }
}
