import Login from "../LoginPage/Login";
import UserRegistration from "../LoginPage/UserRegistration";

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
  const handleLoginSuccess = () => {
    onLoginSuccess();
  };
  return (
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
  );
};

export default LoginPage;
