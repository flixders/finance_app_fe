import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";
import { fetchSpendingVarOverview } from "../../utils/apiUtils";

interface ChartComponentProps {
  startDate?: Date | null;
  endDate?: Date | null;
}
interface SpendingOverview {
  category_name: string;
  amount: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  startDate,
  endDate,
}) => {
  const [chartData, setChartData] = useState<SpendingOverview[] | null>(null);

  const fetchChartData = async (start: Date, end: Date) => {
    try {
      const startDateString = start.toLocaleDateString("sv-SE");
      const endDateString = end.toLocaleDateString("sv-SE");

      const data: SpendingOverview[] | null = await fetchSpendingVarOverview(
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
      fetchChartData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Variabele transacties per categorie",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Categorie",
      },
    },
    yAxis: {
      title: {
        text: "Totaal bedrag (€)",
      },
      labels: {
        formatter: function () {
          return "€" + Highcharts.numberFormat(this.value, 0, ",", ".");
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
        borderRadius: 20, // Adjust the border radius to make edges rounder
        pointWidth: 30, // Adjust the width of the columns
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
            return "€" + Highcharts.numberFormat(this.y, 0, ",", ".");
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
