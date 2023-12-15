import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/apiUtils";
import { chartStyle } from "../../utils/highchartConfig";

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
        const timestamp = Date.UTC(year, month - 1, day);
        return [timestamp, item.account_balance];
      })
    : [];
  const sortedData: [number, number][] = formattedData
    .slice()
    .sort((a, b) => a[0] - b[0]);
  const options = {
    chart: {
      type: "spline",
      backgroundColor: chartStyle.chart.backgroundColor,
      style: {
        fontFamily: chartStyle.chart.style.fontFamily,
        color: chartStyle.chart.style.color,
      },
    },
    plotOptions: {
      spline: {
        lineWidth: 3,
      },
    },
    title: {
      text: "Ontwikkeling vermogen",
      margin: chartStyle.title.margin,
      style: {
        fontSize: chartStyle.title.style.fontSize,
        fontWeight: chartStyle.title.style.fontWeight,
        color: chartStyle.title.style.color,
      },
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "",
      },
      labels: {
        style: {
          color: chartStyle.xAxis.labels.style.color,
        },
      },
      lineColor: chartStyle.xAxis.lineColor,
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineColor: chartStyle.yAxis.gridLineColor,
      labels: {
        style: {
          color: chartStyle.xAxis.labels.style.color,
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
        color: "#38A169",
        marker: {
          enabled: true,
          fillColor: chartStyle.series.marker.fillColor,
          lineColor: "#38A169",
          lineWidth: chartStyle.series.marker.lineWidth,
          radius: 5,
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
