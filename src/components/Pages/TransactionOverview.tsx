import { useEffect, useState } from "react";
import { fetchData } from "../../utils/apiUtils";
import { Box, Flex, Grid, Skeleton } from "@chakra-ui/react";
import DateAndDaysPicker from "../TransactionOverview/DateAndDaysPicker";
import SpendingVariableCategory from "../TransactionOverview/SpendingVariableCategory";
import BankAccountTrend from "../TransactionOverview/BankAccountTrend";
import ValueBoxBudgetOverview from "../TransactionOverview/ValueBoxBudgetOverview";
import SpendingVariableTrend from "../TransactionOverview/SpendingVariableTrend";
import { BudgetOverview } from "../../utils/interfaces";
import AvailableBudgetTrend from "../TransactionOverview/AvailableBudgetTrend";

const TransactionOverview = () => {
  const today = new Date();
  const currentDay = today.getDay();

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - ((currentDay + 6) % 7));
  const [startDate, setStartDate] = useState<Date>(lastMonday);

  const nextSunday = new Date(startDate);
  nextSunday.setDate(startDate.getDate() + 6);
  const [endDate, setEndDate] = useState<Date | null>(nextSunday);

  const [chartData, setChartData] = useState<BudgetOverview[] | null>(null);

  const fetchChartData = async (endpoint: string, start: Date, end: Date) => {
    try {
      setIsLoading(true);
      const differenceInMs = Math.abs(end.getTime() - start.getTime());
      const differenceInDays =
        Math.ceil(differenceInMs / (1000 * 60 * 60 * 24)) + 1;

      const year = end.getFullYear();
      const month = String(end.getMonth() + 1).padStart(2, "0");
      const day = String(end.getDate()).padStart(2, "0");
      const endDateString = `${year}-${month}-${day}`;
      const data: BudgetOverview[] | null = await fetchData(
        endpoint,
        undefined,
        endDateString,
        differenceInDays
      );
      setChartData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, [startDate]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (endDate) {
      fetchChartData(
        "cashflow/calculations/budget-interval",
        startDate,
        endDate
      );
    }
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
      </Flex>
      {isLoading ? (
        <>
          <Flex gap={5} marginTop={5}>
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index} // Add a unique key for each Skeleton component
                height="120px"
                width="18%"
                borderRadius="20px"
                boxShadow="md"
                variant={"text"}
              />
            ))}
          </Flex>
          <Grid
            marginTop="25px"
            paddingRight={"40px"}
            templateColumns="repeat(2, 1fr)"
            gap={4}
            justifyContent="center"
            alignItems="center"
          >
            {[...Array(4)].map((_) => (
              <Skeleton height="50vh" borderRadius={"20px"} />
            ))}
          </Grid>
        </>
      ) : (
        <>
          <ValueBoxBudgetOverview chartData={chartData} />
          <Grid
            marginTop="25px"
            paddingRight={"40px"}
            templateColumns="repeat(2, 1fr)"
            gap={4}
            justifyContent="center"
            alignItems="center"
          >
            <Box border="1px solid #ccc" borderRadius="15px" padding={"20px"}>
              <SpendingVariableCategory
                startDate={startDate}
                endDate={endDate}
              />
            </Box>
            <Box border="1px solid #ccc" borderRadius="15px" padding={"20px"}>
              <AvailableBudgetTrend chartData={chartData} />
            </Box>
            <Box border="1px solid #ccc" borderRadius="15px" padding={"20px"}>
              <SpendingVariableTrend chartData={chartData} />
            </Box>
            <Box border="1px solid #ccc" borderRadius="15px" padding={"20px"}>
              <BankAccountTrend />
            </Box>
          </Grid>
        </>
      )}
    </div>
  );
};

export default TransactionOverview;
