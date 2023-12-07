// LoginForm.tsx

import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { loginUser, LoginResponse } from "../../utils/apiUtils";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface LoginFormProps {
  onLoginSuccess: () => void;
  endpoint: string;
}
const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, endpoint }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, error: loginError }: LoginResponse = await loginUser(
      username,
      password,
      endpoint
    );

    if (success) {
      onLoginSuccess();
    } else {
      setError(loginError);
    }
  };

  return (
    <Flex>
      <Box width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel htmlFor="username">Gebruikersnaam</FormLabel>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="password">Wachtwoord</FormLabel>
            <Flex align="center">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                variant="ghost"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={togglePasswordVisibility}
                ml="-50"
                zIndex={999999}
              />
            </Flex>
          </FormControl>
          <Button colorScheme="blue" mt={6} type="submit" width="100%">
            Login
          </Button>
        </form>
        {error && (
          <Text color="red.500" mt={4} textAlign="center">
            {error}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default LoginForm;
