import { useState, useEffect } from "react";
import Login from "./components/Login";
import ChakraTable from "./components/ChakraTable";
import GenericChakraForm from "./components/GenericChakraForm";
import { fetchDataAndUpdateState } from "./utils/apiUtils";
import { FormField, generateFormFields } from "./utils/generateFormFields";
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
    }
  }, [isLoggedIn]);

  //logic to update bankaccount table
  const BankAccountFormFields: FormField[] = generateFormFields([
    {
      name: "date",
      type: "date",
      label: "Datum",
      placeholder: "Datum van bedrag op bankrekening",
    },
    {
      name: "account_balance",
      type: "numeric",
      label: "Bedrag",
      placeholder: "Beschikbaar vermogen",
    },
  ]);
  const [bankAccountData, setbankAccountData] = useState<any[]>([]);
  const handleBankAccountFormRequest = () => {
    fetchDataAndUpdateState("cashflow/bank-account", setbankAccountData);
  };

  // VARIABELE LASTEN
  const TransactionVariableFields: FormField[] = generateFormFields([
    {
      name: "amount",
      type: "numeric",
      label: "Bedrag",
      placeholder: "Bedrag van aankoop",
    },
    {
      name: "date",
      type: "date",
      label: "Datum",
      placeholder: "Datum van aankoop",
    },
    {
      name: "category",
      type: "numeric",
      label: "Categorie",
      placeholder: "Categorie van aankoop",
    },
    {
      name: "description",
      type: "text",
      label: "Beschrijving",
      placeholder: "Beschrijving van aankoop",
    },
    {
      name: "transaction_type",
      type: "numeric",
      label: "Type aankoop",
      placeholder: "Welk type was je aankoop?",
    },
  ]);

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
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Tabs variant="line" marginLeft={"20px"} marginRight={"20px"}>
            <TabList>
              <Tab>Bankrekening</Tab>
              <Tab>Vaste lasten</Tab>
              <Tab>Variabelen uitgaven</Tab>
              <Tab>Overzicht</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex justify="center" width="100%" marginTop="50px">
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box
                      border="1px solid #ccc"
                      borderRadius="15px"
                      padding="20px"
                    >
                      <GenericChakraForm
                        form_title="Beschikbaar vermogen"
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
                          account_balance: "Vermogen",
                        }}
                        endpoint="cashflow/bank-account"
                        onFormRequest={handleBankAccountFormRequest}
                      />
                    </Box>
                  </Grid>
                </Flex>
              </TabPanel>

              {/* Second Tab Panel */}
              <TabPanel></TabPanel>

              {/* Third Tab Panel */}
              <TabPanel>
                <Flex justify="center" width="100%" marginTop="50px">
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box
                      border="1px solid #ccc"
                      borderRadius="15px"
                      padding="20px"
                    >
                      <GenericChakraForm
                        form_title="Variabele uitgaves"
                        fields={TransactionVariableFields}
                        endpoint="cashflow/transaction-variable/"
                        onFormRequest={handleBankAccountFormRequest}
                      />
                    </Box>
                    {/* Second column */}
                    <Box
                      border="1px solid #ccc"
                      borderRadius="15px"
                      padding="20px"
                    >
                      {/* <ChakraTable
                        data={}
                        columnTranslations={{}}
                        endpoint="cashflow/bank-account"
                        onFormRequest={handleBankAccountFormRequest}
                      /> */}
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
