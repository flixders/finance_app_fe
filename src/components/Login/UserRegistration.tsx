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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { registerUser, RegistrationResponse } from "../../utils/apiUtils";

interface RegistrationFormProps {
  onRegistrationSuccess: () => void;
  endpoint: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegistrationSuccess,
  endpoint,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, error: registrationError }: RegistrationResponse =
      await registerUser(
        username,
        password,
        email,
        firstName,
        lastName,
        endpoint
      );

    if (success) {
      onRegistrationSuccess();
    } else {
      setError(registrationError);
    }
  };

  return (
    <Flex>
      <Box width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleRegistration}>
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
          <FormControl mt={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="firstName">Naam</FormLabel>
            <Input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="lastName">Achternaam</FormLabel>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" mt={6} type="submit" width="100%">
            Registreer en log in
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

export default RegistrationForm;
