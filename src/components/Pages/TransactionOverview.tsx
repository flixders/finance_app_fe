import { useEffect, useState } from "react";
import DateAndDaysPicker from "../TransactionOverview/DateAndDaysPicker";
import ValueBoxBudgetOverview from "../TransactionOverview/ValueBoxBudgetOverview";
import { Box, Flex, Grid } from "@chakra-ui/react";
import SpendingVariableCategory from "../TransactionOverview/SpendingVariableCategory";
import BankAccountTrend from "../TransactionOverview/BankAccountTrend";

const TransactionOverview = () => {
  //Dates
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.

    // Calculate the last Monday
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - ((currentDay + 6) % 7));

    // Calculate the following Sunday
    const nextSunday = new Date(lastMonday);
    nextSunday.setDate(lastMonday.getDate() + 6);

    // Set the state for start and end dates
    setStartDate(lastMonday);
    setEndDate(nextSunday);
  }, []);

  return (
    <div style={{ padding: "20px 0px 0px 65px" }}>
      <Flex direction={"column"}>
        <DateAndDaysPicker
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          setSelectedStartDate={setStartDate}
          setSelectedEndDate={setEndDate}
        />
        <ValueBoxBudgetOverview startDate={startDate} endDate={endDate} />
      </Flex>
      <Flex marginTop={"30px"}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={4}
          justifyContent="center"
          alignItems="center"
        >
          <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
            <SpendingVariableCategory startDate={startDate} endDate={endDate} />
          </Box>
          <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
            <BankAccountTrend />
          </Box>
          <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
            <SpendingVariableCategory startDate={startDate} endDate={endDate} />
          </Box>
          <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
            <SpendingVariableCategory startDate={startDate} endDate={endDate} />
          </Box>
        </Grid>
      </Flex>
    </div>
  );
};

export default TransactionOverview;
