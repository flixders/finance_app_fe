import React, { useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import { deleteRecord } from "../utils/apiUtils";
interface Props {
  data: { [key: string]: any }[];
  columnTranslations: { [key: string]: string };
  endpoint: string;
  onFormRequest: () => void;
}

const ChakraTable: React.FC<Props> = ({
  data,
  columnTranslations,
  onFormRequest,
  endpoint,
}) => {
  if (!data) {
    return <Spinner />;
  }

  if (data.length === 0) {
    return <Text>Nog geen gegevens ingevuld</Text>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const maxButtonsToShow = 4; // Maximum number of page buttons to display
  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const onDelete = async (record_id: number, endpoint: string) => {
    try {
      await deleteRecord(record_id, endpoint);
      onFormRequest();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  let displayPages = pageNumbers.slice(
    Math.max(currentPage - Math.floor(maxButtonsToShow / 2), 0),
    Math.min(currentPage + Math.ceil(maxButtonsToShow / 2), totalPages)
  );

  if (currentPage <= Math.floor(maxButtonsToShow / 2)) {
    displayPages = pageNumbers.slice(0, maxButtonsToShow);
  } else if (currentPage >= totalPages - Math.floor(maxButtonsToShow / 2)) {
    displayPages = pageNumbers.slice(totalPages - maxButtonsToShow, totalPages);
  }

  const columnsToShow = Object.keys(columnTranslations);

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            {columnsToShow.map((column_name, index) => (
              <Th key={index}>{columnTranslations[column_name]}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {columnsToShow.map((column, colIndex) => (
                  <Td key={colIndex}>{row[column]}</Td>
                ))}

                {/* Add a Delete button/icon here */}
                <Td>
                  <IoCloseOutline
                    onClick={() => onDelete(row.id, endpoint)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "24px",
                    }}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <HStack spacing={2} mt={4}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Vorige
        </Button>
        {displayPages.map((number) => (
          <Button
            key={number}
            onClick={() => goToPage(number)}
            variant={currentPage === number ? "solid" : "outline"}
            colorScheme={currentPage === number ? "blue" : "gray"}
          >
            {number}
          </Button>
        ))}
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Volgende
        </Button>
      </HStack>
    </div>
  );
};

export default ChakraTable;
