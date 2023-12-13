import { Flex, Skeleton } from "@chakra-ui/react";
import {
  FaPiggyBank,
  FaShoppingCart,
  FaBriefcase,
  FaMoneyBillWave,
  FaCoins,
} from "react-icons/fa";
import ValueBox from "./ValueBox";
import { BudgetOverview } from "../../utils/interfaces";

interface ValueBoxBudgetOverviewProps {
  chartData: BudgetOverview[] | null;
}

const ValueBoxBudgetOverview: React.FC<ValueBoxBudgetOverviewProps> = ({
  chartData,
}) => {
  if (chartData === null) {
    return <p style={{ marginTop: "20px" }}>Geen data beschikbaar</p>;
  }

  //current date selection
  let currentBudget: BudgetOverview[] | null = null;
  currentBudget = chartData.slice(-5);
  const iconMapping: { [key: string]: React.ElementType } = {
    "Inkomen vast": FaBriefcase,
    "Uitgaven vast": FaMoneyBillWave,
    "Uitgaven variabel": FaShoppingCart,
    "Inkomen variabel": FaCoins,
    "Beschikbaar budget": FaPiggyBank,
  };
  return (
    <Flex gap={5} marginTop={5}>
      {currentBudget && currentBudget.length > 0 ? (
        currentBudget.map((expense: any, index: number) => {
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
