interface ChartStyle {
  chart: {
    backgroundColor: string;
    style: {
      fontFamily: string;
      color: string;
    };
  };
  title: {
    margin: number;
    style: {
      fontSize: string;
      fontWeight: string;
      color: string;
    };
  };
  xAxis: {
    labels: {
      style: {
        color: string;
      };
    };
    lineColor: string;
  };
  yAxis: {
    gridLineColor: string;
    labels: {
      style: {
        color: string;
      };
    };
  };
  series: {
    marker: {
      fillColor: string;
      lineWidth: number;
    };
  };
}

export const chartStyle: ChartStyle = {
  chart: {
    backgroundColor: "#1A202C",
    style: {
      fontFamily: '"Roboto", sans-serif',
      color: "#E2E8F0",
    },
  },
  title: {
    margin: 30,
    style: {
      fontSize: "22px",
      fontWeight: "100",
      color: "#E2E8F0",
    },
  },
  xAxis: {
    labels: {
      style: {
        color: "#E2E8F0",
      },
    },
    lineColor: "#4A5568",
  },
  yAxis: {
    gridLineColor: "rgba(226, 232, 240, 0.1)",
    labels: {
      style: {
        color: "#E2E8F0",
      },
    },
  },
  series: {
    marker: {
      fillColor: "white",
      lineWidth: 2,
    },
  },
};

export function hexToRGBA(hex: string, alpha: number): string {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
