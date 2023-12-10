import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BudgetOverview } from "../../utils/interfaces";

interface SpendingVariableProps {
  chartData: BudgetOverview[] | null;
}

const SpendingVariableTrend: React.FC<SpendingVariableProps> = ({
  chartData,
}) => {
  if (chartData === null) {
    return <p>Geen data beschikbaar</p>;
  }
  const filteredBudgetData = chartData.filter(
    (item) => item.transaction_type_title === "Uitgaven variabel"
  );

  const formattedFilteredData: [number, number][] = filteredBudgetData
    ? filteredBudgetData.map((item) => {
        const [year, month, day] = item.date.split("-").map(Number);
        const timestamp = Date.UTC(year, month - 1, day);
        return [timestamp, item.amount * -1];
      })
    : [];

  const sortedData: [number, number][] = formattedFilteredData
    .slice()
    .sort((a, b) => a[0] - b[0]);

  const options = {
    chart: {
      type: "areaspline",
      backgroundColor: "#1A202C", // Chakra UI's dark background color
      style: {
        fontFamily: '"Roboto", sans-serif', // Chakra UI's font or choose appropriate font
        color: "#E2E8F0", // Chakra UI's text color for contrast
      },
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, "rgba(245, 101, 101, 1)"], // Higher opacity at the start
            [0.8, "rgba(245, 101, 101, 0.2)"], // Lower opacity in the middle
            [1, "rgba(245, 101, 101, 0.1)"], // Lower opacity in the middle
          ],
        },
      },
    },
    title: {
      text: " Trend variabele uitgaven",
      margin: 30,
      style: {
        fontSize: "22px",
        fontWeight: "100",
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
      tickInterval: 150,
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
        name: "Variabele uitgave",
        data: sortedData,
        color: "#F56565",
        marker: {
          enabled: true,
          fillColor: "white",
          lineColor: "#F56565",
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

export default SpendingVariableTrend;
