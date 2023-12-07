import React, { ChangeEvent, useEffect } from "react";
import { Box, Flex, Input, FormLabel } from "@chakra-ui/react";
import { fetchBudgetOverview } from "../../utils/apiUtils";

interface DateAndDaysPickerProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  setSelectedStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DateAndDaysPicker: React.FC<DateAndDaysPickerProps> = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}) => {
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const newStartDate = new Date(dateValue);
    setSelectedStartDate(newStartDate);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const newEndDate = new Date(dateValue);
    setSelectedEndDate(newEndDate);
  };

  useEffect(() => {
    if (selectedStartDate !== null && selectedEndDate !== null) {
      // Call the API function to fetch data based on the date range
      fetchBudgetData(
        selectedStartDate.toLocaleDateString("sv-SE"),
        selectedEndDate.toLocaleDateString("sv-SE")
      );
    }
  }, [selectedStartDate, selectedEndDate]);

  const fetchBudgetData = async (startDate: string, endDate: string) => {
    try {
      const data = await fetchBudgetOverview(startDate, endDate);
      console.log(data);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching budget overview data:", error);
    }
  };

  return (
    <Flex align="center">
      <Box mr={4}>
        <FormLabel>
          <b>Start periode</b>
        </FormLabel>
        <Input
          type="date"
          name="StartDate"
          value={
            selectedStartDate
              ? selectedStartDate.toLocaleDateString("sv-SE")
              : ""
          }
          onChange={handleStartDateChange}
        />
      </Box>
      <Box>
        <FormLabel>
          <b>Einde periode</b>
        </FormLabel>
        <Input
          type="date"
          name="EndDate"
          value={
            selectedEndDate ? selectedEndDate.toLocaleDateString("sv-SE") : ""
          }
          onChange={handleEndDateChange}
          min={
            selectedStartDate
              ? selectedStartDate.toLocaleDateString("sv-SE")
              : ""
          }
        />
      </Box>
    </Flex>
  );
};

export default DateAndDaysPicker;
