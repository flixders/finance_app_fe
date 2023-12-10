import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BudgetOverview } from "../../utils/interfaces";

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

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: " Overgebleven budget",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "",
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
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
        name: "Budget",
        data: sortedData,
        color: "#63B3ED",
        marker: {
          enabled: true,
          fillColor: "white",
          lineColor: "#63B3ED",
          lineWidth: 2,
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
