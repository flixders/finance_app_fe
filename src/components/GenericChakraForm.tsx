import React, { useState, ChangeEvent } from "react";
import { submitFormData } from "../utils/apiUtils";
import { FormField } from "../utils/formFields";

import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  HStack,
} from "@chakra-ui/react";

interface Props {
  fields: FormField[];
  endpoint: string;
  onFormRequest: () => void;
}

const GenericChakraForm: React.FC<Props> = ({
  fields,
  endpoint,
  onFormRequest,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const renderFormField = (field: FormField) => {
    if (field.inputType === "input") {
      return (
        <Input
          type={field.inputElementType}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          placeholder={field.placeholder}
        />
      );
    } else if (field.inputType === "select") {
      return (
        <Select
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          placeholder={field.placeholder}
        >
          {field.selectOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    }
    return null;
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <FormControl key={field.name} marginBottom="20px">
            <FormLabel>{field.label}</FormLabel>
            {renderFormField(field)}
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
