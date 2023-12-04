import { useState, useEffect } from "react";
import Login from "./components/Login";
import ChakraTable from "./components/ChakraTable";
import GenericChakraForm from "./components/GenericChakraForm";
import LogoutButton from "./components/LogoutButton";
import { fetchDataAndUpdateState } from "./utils/apiUtils";
import UserRegistration from "./components/UserRegistration";

import {
  BankAccountFormFields,
  TransactionVariableFields,
  TransactionPlannedFields,
} from "./utils/formFields";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  //by a refresh this checks wheter jwt is saved to local storage so user doesn't have to loggin again
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
    }
    setCheckingAuth(false);
  }, []);
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
    fetchDataAndUpdateState(
      "cashflow/transaction-planned/",
      setransactionsPlannedData
    );
  };

  // VARIABELE LASTEN
  const [transactionsVariableData, setransactionsVariableData] = useState<
    any[]
  >([]);

  const handlesetransactionsVariableDataFormRequest = () => {
    fetchDataAndUpdateState(
      "cashflow/transaction-variable/",
      setransactionsVariableData
    );
  };

  return (
    <>
      {checkingAuth ? (
        "Even aan het landen..."
      ) : !isLoggedIn ? (
        <>
          <Tabs variant="soft-rounded" isLazy>
            <TabList justifyContent="center" mb={4} marginTop={30}>
              <Tab fontSize="md" px={3} py={2} mx={1}>
                Login
              </Tab>
              <Tab fontSize="md" px={3} py={2} mx={1}>
                Registreer
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex justify="center" width="100%">
                  <Login
                    onLoginSuccess={handleLoginSuccess}
                    endpoint="auth/jwt/create"
                  />
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex justify="center" width="100%">
                  <UserRegistration
                    onRegistrationSuccess={handleLoginSuccess}
                    endpoint="/auth/users/"
                  />
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <>
          <LogoutButton />
          <Tabs variant="line" marginLeft={"50px"} marginRight={"150px"}>
            <TabList>
              <Tab>Bankrekening</Tab>
              <Tab>Geplande transacties</Tab>
              <Tab>Variabele transacties</Tab>
              <Tab>Overzicht</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex justify="center" width="100%" marginTop="20px">
                  <Grid templateColumns="1fr 2fr" gap={4}>
                    <Box
                      border="1px solid #ccc"
                      borderRadius="15px"
                      padding="20px"
                    >
                      <GenericChakraForm
                        fields={BankAccountFormFields}
                        endpoint="cashflow/bank-account"
                        onFormRequest={handleBankAccountFormRequest}
                      />
                    </Box>
                    {/* Second column */}
                    <Box
                      border="1px solid #ccc"
                      borderRadius="15px"
                      padding="20px"
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
                    <Box
                      border="1px solid #ccc"
                      borderRadius="15px"
                      padding="20px"
                    >
                      <GenericChakraForm
                        fields={TransactionPlannedFields}
                        endpoint="cashflow/transaction-planned"
                        onFormRequest={
                          handlesetransactionsPlannedDataFormRequest
                        }
                      />
                    </Box>
                    {/* Second column */}
                    <Box
                      border="1px solid #ccc"
                      borderRadius="15px"
                      padding="20px"
                    >
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
                        onFormRequest={
                          handlesetransactionsPlannedDataFormRequest
                        }
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
                    >
                      <GenericChakraForm
                        fields={TransactionVariableFields}
                        endpoint="cashflow/transaction-variable"
                        onFormRequest={
                          handlesetransactionsVariableDataFormRequest
                        }
                      />
                    </Box>
                    {/* Second column */}
                    <Box
                      border="1px solid #ccc"
                      borderRadius="15px"
                      padding="20px"
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
                        onFormRequest={
                          handlesetransactionsVariableDataFormRequest
                        }
                        euroColumn="amount"
                      />
                    </Box>
                  </Grid>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  );
}
export default App;
