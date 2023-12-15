import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ValueBoxProps {
  title: string;
  value: ReactNode;
  icon?: React.ElementType;
  iconColor?: string;
}

const ValueBox: React.FC<ValueBoxProps> = ({
  title,
  value,
  icon: IconComponent,
  iconColor = "blue.100",
}) => {
  return (
    <Box
      border="1px solid #ccc"
      borderRadius="15px"
      padding={"20px"}
      width="18%"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontWeight="light" fontSize="lg">
            {title}
          </Text>
          <Text fontWeight="bold" fontSize="4xl">
            {value}
          </Text>
        </Box>
        {IconComponent && (
          <Icon as={IconComponent} ml="2" fontSize="4xl" color={iconColor} />
        )}
      </Flex>
    </Box>
  );
};

export default ValueBox;
