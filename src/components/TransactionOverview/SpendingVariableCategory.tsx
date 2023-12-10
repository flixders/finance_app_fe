import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/apiUtils";

interface ChartComponentProps {
  startDate?: Date | null;
  endDate?: Date | null;
}
interface SpendingOverview {
  category_name: string;
  amount: number | null | undefined;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  startDate,
  endDate,
}) => {
  const [chartData, setChartData] = useState<SpendingOverview[] | null>(null);

  const fetchChartData = async (endpoint: string, start: Date, end: Date) => {
    try {
      const startDateString = start.toLocaleDateString("sv-SE");
      const endDateString = end.toLocaleDateString("sv-SE");

      const data: SpendingOverview[] | null = await fetchData(
        endpoint,
        startDateString,
        endDateString
      );
      setChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchChartData(
        "cashflow/calculations/spending-variable",
        startDate,
        endDate
      );
    }
  }, [startDate, endDate]);

  const options: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "#1A202C", // Chakra UI's dark background color
      style: {
        fontFamily: '"Roboto", sans-serif', // Chakra UI's font or choose appropriate font
        color: "#E2E8F0", // Chakra UI's text color for contrast
      },
    },
    title: {
      text: "Variabele transacties per categorie",
      margin: 30,
      style: {
        fontWeight: "100",
        fontSize: "22px",
        color: "#E2E8F0", // Chakra UI's text color for titles
      },
    },
    xAxis: {
      type: "category",
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
      gridLineColor: "rgba(226, 232, 240, 0.1)",
      title: {
        text: "",
      },
      tickInterval: 50,
      labels: {
        style: {
          color: "#E2E8F0", // Chakra UI's text color for axis labels
        },
        formatter: function () {
          const numericValue = Number(this.value);
          if (!isNaN(numericValue)) {
            return "€" + Highcharts.numberFormat(numericValue, 0, ",", ".");
          } else {
            return "No label";
          }
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormatter: function () {
        if (this.y !== null && this.y !== undefined) {
          return `<span style="color:${this.color}">\u25CF</span> ${
            this.series.name
          }: <b>${"€" + Highcharts.numberFormat(this.y, 0, ",", ".")}</b><br/>`;
        }
        return "";
      },
    },
    plotOptions: {
      column: {
        borderRadius: 10,
        pointWidth: 40,
        color: "rgba(245, 101, 101, 0.6)",
      },
    },
    series: [
      {
        type: "column",
        name: "Bedrag",
        data: chartData
          ? chartData.map((item) => ({
              name: item.category_name,
              y: item.amount,
            }))
          : [],
        dataLabels: {
          style: {
            fontSize: "16px", // Adjust the font size as needed
          },
          enabled: true,
          formatter: function () {
            if (this.y !== null && this.y !== undefined) {
              return "€" + Highcharts.numberFormat(this.y, 0, ",", ".");
            } else {
              return "No data";
            }
          },
          animation: {
            duration: 1000,
          },
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
