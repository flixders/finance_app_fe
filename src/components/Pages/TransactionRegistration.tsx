import { useState, useEffect } from "react";
import ChakraTable from "../TransactionRegistration/ChakraTable";
import GenericChakraForm from "../TransactionRegistration/GenericChakraForm";
import { fetchDataAndUpdateState } from "../../utils/apiUtils";
import {
  BankAccountFormFields,
  TransactionVariableFields,
  TransactionPlannedFields,
} from "../../utils/formFields";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const RegistrationPage: React.FC<{ isLoggedIn: boolean }> = ({
  isLoggedIn,
}) => {
  useEffect(() => {
    if (isLoggedIn) {
      fetchDataAndUpdateState("cashflow/bank-account", setbankAccountData);
      fetchDataAndUpdateState(
        "cashflow/transaction-variable/",
        setransactionsVariableData
      );
      fetchDataAndUpdateState(
        "cashflow/transaction-planned/",
        setransactionsPlannedData
      );
    }
  }, [isLoggedIn]);

  //BANKREKENING
  const [bankAccountData, setbankAccountData] = useState<any[]>([]);
  const handleBankAccountFormRequest = () => {
    fetchDataAndUpdateState("cashflow/bank-account", setbankAccountData);
  };

  // VASTE LASTEN
  const [transactionsPlannedData, setransactionsPlannedData] = useState<any[]>(
    []
  );
  const handlesetransactionsPlannedDataFormRequest = () => {
    if (isLoggedIn) {
      fetchDataAndUpdateState(
        "cashflow/transaction-planned/",
        setransactionsPlannedData
      );
    }
  };

  // VARIABELE LASTEN
  const [transactionsVariableData, setransactionsVariableData] = useState<
    any[]
  >([]);

  const handlesetransactionsVariableDataFormRequest = () => {
    if (isLoggedIn) {
      fetchDataAndUpdateState(
        "cashflow/transaction-variable/",
        setransactionsVariableData
      );
    }
  };

  return (
    <Tabs size="lg" variant="soft-rounded" isLazy>
      <Flex justifyContent={"center"}>
        <TabList>
          <Tab>Bankrekening</Tab>
          <Tab>Geplande transacties</Tab>
          <Tab>Variabele transacties</Tab>
        </TabList>
      </Flex>
      <TabPanels>
        <TabPanel>
          <Flex justify="center" width="100%" marginTop="20px">
            <Grid templateColumns="1fr 2fr" gap={4}>
              <Box
                border="1px solid #ccc"
                borderRadius="15px"
                padding="20px"
                maxHeight={"275px"}
              >
                <GenericChakraForm
                  fields={BankAccountFormFields}
                  endpoint="cashflow/bank-account"
                  onFormRequest={handleBankAccountFormRequest}
                />
              </Box>
              <Box
                border="1px solid #ccc"
                borderRadius="15px"
                padding="20px"
                minHeight={"275px"}
              >
                <ChakraTable
                  data={bankAccountData}
                  columnTranslations={{
                    date: "Datum",
                    account_balance: "Bedrag",
                  }}
                  endpoint="cashflow/bank-account"
                  onFormRequest={handleBankAccountFormRequest}
                  euroColumn="account_balance"
                />
              </Box>
            </Grid>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex justify="center" width="100%" marginTop="20px">
            <Grid templateColumns="1fr 2fr" gap={4}>
              <Box border="1px solid #ccc" borderRadius="15px" padding="20px">
                <GenericChakraForm
                  fields={TransactionPlannedFields}
                  endpoint="cashflow/transaction-planned"
                  onFormRequest={handlesetransactionsPlannedDataFormRequest}
                />
              </Box>
              {/* Second column */}
              <Box border="1px solid #ccc" borderRadius="15px" padding="20px">
                <ChakraTable
                  data={transactionsPlannedData}
                  columnTranslations={{
                    amount: "Bedrag",
                    payment_term_name_dutch: "Termijn",
                    date_valid_from: "Datum vanaf",
                    date_valid_up_including: "Datum tot en met",
                    category_name: "Categorie",
                    description: "Beschrijving",
                  }}
                  endpoint="cashflow/transaction-planned"
                  onFormRequest={handlesetransactionsPlannedDataFormRequest}
                  euroColumn="amount"
                />
              </Box>
            </Grid>
          </Flex>
        </TabPanel>

        <TabPanel>
          <Flex justify="center" width="100%" marginTop="20px">
            <Grid templateColumns="1fr 2fr" gap={4}>
              <Box
                border="1px solid #ccc"
                borderRadius="15px"
                padding="20px"
                maxHeight={"475px"}
              >
                <GenericChakraForm
                  fields={TransactionVariableFields}
                  endpoint="cashflow/transaction-variable"
                  onFormRequest={handlesetransactionsVariableDataFormRequest}
                />
              </Box>
              {/* Second column */}
              <Box
                border="1px solid #ccc"
                borderRadius="15px"
                padding="20px"
                minHeight={"475px"}
              >
                <ChakraTable
                  data={transactionsVariableData}
                  columnTranslations={{
                    date: "Datum",
                    amount: "Bedrag",
                    category_name: "Categorie",
                    description: "Beschrijving",
                  }}
                  endpoint="cashflow/transaction-variable"
                  onFormRequest={handlesetransactionsVariableDataFormRequest}
                  euroColumn="amount"
                />
              </Box>
            </Grid>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RegistrationPage;
