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
      style: {
        fontFamily:
          "'-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;",
      },
    },
    title: {
      text: "Variabele transacties per categorie",
    },
    xAxis: {
      type: "category",
      title: {
        text: "",
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
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
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: 10,
        pointWidth: 40,
        color: "#FEB2B2",
      },
    },
    series: [
      {
        type: "column",
        name: "Amount",
        data: chartData
          ? chartData.map((item) => ({
              name: item.category_name,
              y: item.amount,
            }))
          : [],
        dataLabels: {
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
