import { useEffect, useState } from "react";
import { fetchData } from "../../utils/apiUtils";
import { Box, Flex, Grid } from "@chakra-ui/react";
import DateAndDaysPicker from "../TransactionOverview/DateAndDaysPicker";
import SpendingVariableCategory from "../TransactionOverview/SpendingVariableCategory";
import BankAccountTrend from "../TransactionOverview/BankAccountTrend";
import ValueBoxBudgetOverview from "../TransactionOverview/ValueBoxBudgetOverview";
import SpendingVariableTrend from "../TransactionOverview/SpendingVariableTrend";
import { BudgetOverview } from "../../utils/interfaces";
import AvailableBudgetTrend from "../TransactionOverview/AvailableBudgetTrend";

const TransactionOverview = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.

  // Calculate the last Monday
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - ((currentDay + 6) % 7));
  const [startDate, setStartDate] = useState<Date>(lastMonday);

  const nextSunday = new Date(lastMonday);
  nextSunday.setDate(lastMonday.getDate() + 6);
  const [endDate, setEndDate] = useState<Date>(nextSunday);

  const [chartData, setChartData] = useState<BudgetOverview[] | null>(null);
  const fetchChartData = async (
    endpoint: string,
    endDate: Date,
    interval: number
  ) => {
    try {
      const endDateString = endDate.toLocaleDateString("sv-SE");

      const data: BudgetOverview[] | null = await fetchData(
        endpoint,
        undefined,
        endDateString,
        interval
      );
      setChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const differenceInMs = Math.abs(endDate.getTime() - startDate.getTime());
    const differenceInDays =
      Math.ceil(differenceInMs / (1000 * 60 * 60 * 24)) + 1;
    fetchChartData(
      "cashflow/calculations/budget-interval",
      endDate,
      differenceInDays
    );
  }, [startDate, endDate]);

  return (
    <div style={{ padding: "20px 0px 0px 65px" }}>
      <Flex direction={"column"}>
        <DateAndDaysPicker
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          setSelectedStartDate={setStartDate}
          setSelectedEndDate={setEndDate}
        />
        <ValueBoxBudgetOverview chartData={chartData} />
      </Flex>
      <Grid
        marginTop="40px"
        paddingRight={"40px"}
        templateColumns="repeat(2, 1fr)"
        gap={4}
        justifyContent="center"
        alignItems="center"
      >
        <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
          <SpendingVariableCategory startDate={startDate} endDate={endDate} />
        </Box>
        <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
          <SpendingVariableTrend chartData={chartData} />
        </Box>
        <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
          <AvailableBudgetTrend chartData={chartData} />
        </Box>
        <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
          <BankAccountTrend />
        </Box>
      </Grid>
    </div>
  );
};

export default TransactionOverview;
