import { Flex } from "@chakra-ui/react";
import {
  FaPiggyBank,
  FaShoppingCart,
  FaBriefcase,
  FaMoneyBillWave,
} from "react-icons/fa";
import ValueBox from "./ValueBox";
import { useEffect, useState } from "react";
import { fetchBudgetOverview } from "../../utils/apiUtils";
interface ValueBoxBudgetOverviewProps {
  startDate: Date | null;
  endDate: Date | null;
}

const ValueBoxBudgetOverview: React.FC<ValueBoxBudgetOverviewProps> = ({
  startDate,
  endDate,
}) => {
  const [budgetData, setBudgetData] = useState<any>(null);
  const fetchBudgetData = async (start: Date, end: Date) => {
    try {
      const startDateString = start.toLocaleDateString("sv-SE");
      const endDateString = end.toLocaleDateString("sv-SE");

      const data = await fetchBudgetOverview(startDateString, endDateString);
      setBudgetData(data);
    } catch (error) {
      console.error("Error fetching budget overview data:", error);
    }
  };
  useEffect(() => {
    if (startDate && endDate) {
      fetchBudgetData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const iconMapping: { [key: string]: React.ElementType } = {
    "Inkomen vast": FaBriefcase,
    "Uitgaven vast": FaMoneyBillWave,
    "Uitgaven variabel": FaShoppingCart,
    "Inkomen variabel": FaShoppingCart,
    "Beschikbaar budget": FaPiggyBank,
  };

  return (
    <Flex gap={5} marginTop={5}>
      {budgetData && budgetData.length > 0 ? (
        budgetData.map((expense: any, index: number) => {
          const IconComponent =
            iconMapping[expense.transaction_type_title] || FaPiggyBank;

          return (
            <ValueBox
              key={index}
              value={`€${expense.amount.toLocaleString("de-DE", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}`}
              title={expense.transaction_type_title}
              icon={IconComponent} // Use the dynamically selected icon component
            />
          );
        })
      ) : (
        <p>Geen data beschikbaar</p>
      )}
    </Flex>
  );
};

export default ValueBoxBudgetOverview;
