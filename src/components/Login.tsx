import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

interface LoginProps {
  onLoginSuccess: () => void; // Define the prop for onLoginSuccess
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/jwt/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwt = data.access;
        localStorage.setItem("jwt", jwt);
        onLoginSuccess();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again later.");
      console.error("Login Error:", error);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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

export default Login;
