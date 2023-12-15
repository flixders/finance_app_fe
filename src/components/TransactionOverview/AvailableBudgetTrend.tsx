import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BudgetOverview } from "../../utils/interfaces";
import { chartStyle } from "../../utils/highchartConfig";

interface AvailableBudgetTrendProps {
  chartData: BudgetOverview[] | null;
}

const AvailableBudgetTrend: React.FC<AvailableBudgetTrendProps> = ({
  chartData,
}) => {
  if (chartData === null) {
    return <p>Geen data beschikbaar</p>;
  }
  const filteredBudgetData = chartData.filter(
    (item) => item.transaction_type_title === "Budget"
  );

  const formattedFilteredData: [number, number][] = filteredBudgetData
    ? filteredBudgetData.map((item) => {
        const [year, month, day] = item.date.split("-").map(Number);
        const timestamp = Date.UTC(year, month - 1, day);
        return [timestamp, item.amount];
      })
    : [];

  const sortedData: [number, number][] = formattedFilteredData
    .slice()
    .sort((a, b) => a[0] - b[0]);
  const defaultHex = "#38A169";
  const options = {
    chart: {
      type: "areaspline",
      backgroundColor: chartStyle.chart.backgroundColor,
      style: {
        fontFamily: chartStyle.chart.style.fontFamily,
        color: chartStyle.chart.style.color,
      },
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, "rgba(56, 161, 105, 1)"],
            [0.5, "rgba(56, 161, 105, 0.2)"],
            [1, "rgba(56, 161, 105, 0)"],
          ],
        },
      },
    },
    title: {
      text: " Trend overgebleven budget",
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
          color: chartStyle.yAxis.labels.style.color,
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
        name: "Overgebleven budget",
        data: sortedData,
        color: defaultHex,
        marker: {
          enabled: true,
          fillColor: chartStyle.series.marker.fillColor,
          lineColor: defaultHex,
          lineWidth: chartStyle.series.marker.fillColor,
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

export default AvailableBudgetTrend;
