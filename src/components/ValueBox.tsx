import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface ValueBoxProps {
  title: string;
  value: ReactNode;
  icon?: IconType;
  iconColor?: string; // New prop to accept the color
}

const ValueBox: React.FC<ValueBoxProps> = ({
  title,
  value,
  icon: IconComponent,
  iconColor = "blue.200", // Default color if not provided
}) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4" shadow="md" width="275px">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontWeight="light" fontSize="lg">
            {title}
          </Text>
          <Text fontWeight="normal" fontSize="4xl">
            {value}
          </Text>
        </Box>
        {IconComponent && (
          <Icon as={IconComponent} ml="2" fontSize="5xl" color={iconColor} />
        )}
      </Flex>
    </Box>
  );
};

export default ValueBox;
