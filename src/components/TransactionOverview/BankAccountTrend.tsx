import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/apiUtils";

interface SpendingOverview {
  date: string;
  account_balance: number;
}
interface APIResponse {
  results: SpendingOverview[];
}

const ChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<SpendingOverview[] | null>(null);

  const fetchChartData = async (endpoint: string) => {
    try {
      const response: APIResponse | null = await fetchData(endpoint);
      if (response) {
        setChartData(response.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchChartData("cashflow/bank-account");
  }, []);

  const formattedData: [number, number][] = chartData
    ? chartData.map((item) => {
        const [year, month, day] = item.date.split("-").map(Number);
        const timestamp = Date.UTC(year, month - 1, day); // month is zero-based in JavaScript
        return [timestamp, item.account_balance];
      })
    : [];
  const sortedData: [number, number][] = formattedData
    .slice()
    .sort((a, b) => a[0] - b[0]);
  const options = {
    chart: {
      type: "spline",
      backgroundColor: "#1A202C", // Chakra UI's dark background color
      style: {
        fontFamily: '"Roboto", sans-serif', // Chakra UI's font or choose appropriate font
        color: "#E2E8F0", // Chakra UI's text color for contrast
      },
    },
    plotOptions: {
      spline: {
        lineWidth: 3, // Adjust the line width for the line series
      },
      // Other plot options for different series types if needed...
    },
    title: {
      text: "Ontwikkeling vermogen",
      margin: 30,
      style: {
        fontSize: "22px",
        fontWeight: "100",
        margin: 20,
        color: "#E2E8F0", // Chakra UI's text color for titles
      },
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "",
      },
      labels: {
        style: {
          color: "#E2E8F0", // Chakra UI's text color for axis labels
        },
      },
      lineColor: "#4A5568", // Chakra UI's
    },
    yAxis: {
      tickInterval: 750,
      title: {
        text: "",
      },
      gridLineColor: "rgba(226, 232, 240, 0.1)",
      labels: {
        style: {
          color: "#E2E8F0", // Chakra UI's text color for axis labels
        },
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ) {
          return this.value.toLocaleString("nl-NL", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });
        },
      },
    },
    tooltip: {
      pointFormatter: function (
        this: Highcharts.TooltipFormatterContextObject
      ) {
        if (this.y !== null && this.y !== undefined) {
          return `<span style="color:${this.color}">\u25CF</span> ${
            this.series.name
          }: <b>${this.y.toLocaleString("nl-NL", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}</b><br/>`;
        }
        return "";
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Vermogen",
        data: sortedData,
        color: "#38A169", // Chakra blue.300 for line color
        marker: {
          enabled: true, // Show markers for all data points
          fillColor: "white", // Marker fill color
          lineColor: "#38A169", // Chakra blue.300 for marker outline color
          lineWidth: 2, // Adjust the marker outline width if needed
          radius: 5, // Adjust the marker size
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartComponent;
