import React, { ChangeEvent } from "react";
import { Box, Flex, Input, FormLabel } from "@chakra-ui/react";

interface DateAndDaysPickerProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  setSelectedStartDate: React.Dispatch<React.SetStateAction<Date>>;
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
    console.log(newEndDate);
    setSelectedEndDate(newEndDate);
  };

  return (
    <Flex align="center">
      <Box mr={4}>
        <FormLabel>
          <b>Start periode</b>
        </FormLabel>
        <Input
          border="1px solid #ccc"
          borderRadius="15px"
          padding={"20px"}
          type="date"
          name="StartDate"
          value={
            selectedStartDate
              ? selectedStartDate.toLocaleDateString("sv-SE")
              : ""
          }
          max={
            selectedEndDate
              ? selectedEndDate.toLocaleDateString("sv-SE")
              : undefined
          }
          onChange={handleStartDateChange}
        />
      </Box>
      <Box>
        <FormLabel>
          <b>Einde periode</b>
        </FormLabel>
        <Input
          border="1px solid #ccc"
          borderRadius="15px"
          padding={"20px"}
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
