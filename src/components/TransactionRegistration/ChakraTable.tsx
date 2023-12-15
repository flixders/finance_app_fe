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
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import { deleteRecord } from "../../utils/apiUtils";

interface Props {
  data: { [key: string]: any }[];
  columnTranslations: { [key: string]: string };
  endpoint: string;
  onFormRequest: () => void;
  euroColumn: string;
}

const ChakraTable: React.FC<Props> = ({
  data,
  columnTranslations,
  onFormRequest,
  endpoint,
  euroColumn,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8);
  const maxButtonsToShow = 4;
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

  let displayPages = [];
  if (totalPages <= maxButtonsToShow) {
    displayPages = pageNumbers;
  } else if (currentPage <= Math.floor(maxButtonsToShow / 2)) {
    displayPages = pageNumbers.slice(0, maxButtonsToShow);
  } else if (currentPage >= totalPages - Math.floor(maxButtonsToShow / 2)) {
    displayPages = pageNumbers.slice(totalPages - maxButtonsToShow);
  } else {
    displayPages = pageNumbers.slice(
      currentPage - Math.floor(maxButtonsToShow / 2) - 1,
      currentPage + Math.floor(maxButtonsToShow / 2)
    );
  }

  const columnsToShow = Object.keys(columnTranslations);

  const formatAsEuros = (value: number | string): string => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return "";
    }

    const formattedValue = new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: numericValue % 1 === 0 ? 0 : 2,
    }).format(numericValue);

    return formattedValue;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
                  <Td
                    key={colIndex}
                    style={{
                      maxWidth: "15ch",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column === euroColumn
                      ? formatAsEuros(row[column])
                      : row[column]}
                  </Td>
                ))}
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

      <div>
        {totalPages > 1 && (
          <HStack spacing={2} justifyContent="flex-end" marginTop={"20px"}>
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
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Volgende
            </Button>
          </HStack>
        )}
      </div>
    </div>
  );
};

export default ChakraTable;
