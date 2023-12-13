import Login from "../Pages/Login";
import UserRegistration from "./UserRegistration";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

interface LoginPageProps {
  onLoginSuccess: () => void;
}
const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleLoginSuccess = () => {
    navigate("/registratie");
    onLoginSuccess();
  };
  const handleRegistrationSuccess = () => {
    setActiveTabIndex(0);
  };
  return (
    <Tabs
      variant="soft-rounded"
      isLazy
      index={activeTabIndex}
      onChange={setActiveTabIndex}
    >
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
              onRegistrationSuccess={handleRegistrationSuccess}
              endpoint="/auth/users/"
            />
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LoginPage;
