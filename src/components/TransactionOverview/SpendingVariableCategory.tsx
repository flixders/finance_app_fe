import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/apiUtils";
import { chartStyle } from "../../utils/highchartConfig";

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
      backgroundColor: chartStyle.chart.backgroundColor,
      style: {
        fontFamily: chartStyle.chart.style.fontFamily,
        color: chartStyle.chart.style.color,
      },
    },
    title: {
      text: "Variabele transacties per categorie",
      margin: chartStyle.title.margin,
      style: {
        fontSize: chartStyle.title.style.fontSize,
        fontWeight: chartStyle.title.style.fontWeight,
        color: chartStyle.title.style.color,
      },
    },
    xAxis: {
      type: "category",
      title: {
        text: "",
      },
      labels: {
        style: {
          color: chartStyle.title.style.color,
        },
      },
      lineColor: chartStyle.xAxis.lineColor,
    },
    yAxis: {
      gridLineColor: chartStyle.yAxis.gridLineColor,
      title: {
        text: "",
      },
      labels: {
        style: {
          color: chartStyle.yAxis.labels.style.color,
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
            fontSize: "16px",
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
