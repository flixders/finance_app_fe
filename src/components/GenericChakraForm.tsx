import React, { useState, ChangeEvent } from "react";
import { FormField } from "../utils/generateFormFields";
import { submitFormData } from "../utils/apiUtils";

import {
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";

interface Props {
  form_title: string;
  fields: FormField[];
  endpoint: string;
  onFormRequest: () => void;
}

const GenericChakraForm: React.FC<Props> = ({
  form_title,
  fields,
  endpoint,
  onFormRequest,
}) => {
  const [formData, setFormData] = useState<any>({});
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await submitFormData(formData, endpoint);
      console.log("Form submitted successfully!");
      setFormData({});
      onFormRequest();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Box mb={4}>
        <Text as="h1" fontSize="2xl" fontWeight="bold" color="grey.100">
          {form_title}
        </Text>
      </Box>
      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <FormControl key={field.name} marginBottom="20px">
            <FormLabel>{field.label}</FormLabel>
            <Input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          </FormControl>
        ))}
        <HStack spacing={4} mt={4}>
          <Button type="submit" colorScheme="blue">
            Verstuur
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default GenericChakraForm;
