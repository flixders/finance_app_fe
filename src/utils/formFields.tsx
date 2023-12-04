import { updateFieldOptions } from "./apiUtils";

export interface FormField {
  name: string;
  inputType: "input" | "select";
  label: string;
  placeholder: string;
  inputElementType?: string;
  selectOptions?: { value: string | number; label?: string }[];
}
const generateFormFields = (fields: FormField[]): FormField[] => {
  return fields;
};

export const BankAccountFormFields: FormField[] = generateFormFields([
  {
    name: "date",
    inputType: "input",
    inputElementType: "date",
    label: "Datum",
    placeholder: "",
  },
  {
    name: "account_balance",
    inputType: "input",
    inputElementType: "number",
    label: "Bedrag",
    placeholder: "",
  },
]);

export const TransactionVariableFields: FormField[] = generateFormFields([
  {
    name: "date",
    inputType: "input",
    inputElementType: "date",
    label: "Datum",
    placeholder: "",
  },
  {
    name: "amount",
    inputType: "input",
    inputElementType: "number",
    label: "Bedrag",
    placeholder: "",
  },
  {
    name: "category",
    inputType: "select",
    label: "Categorie",
    placeholder: "Selecteer een categorie",
    selectOptions: [],
  },
  {
    name: "description",
    inputType: "input",
    inputElementType: "text",
    label: "Beschrijving",
    placeholder: "",
  },
]);
updateFieldOptions(
  TransactionVariableFields,
  "cashflow/transaction-category-list",
  "category",
  "id",
  "category_name"
)
  .then((updatedFields) => {
    // Optionally, you can use the updatedFields here if needed
    console.log("Updated TransactionVariableFields:", updatedFields);
  })
  .catch((error) => {
    console.error("Error updating TransactionVariableFields:", error);
  });
export const TransactionPlannedFields: FormField[] = generateFormFields([
  {
    name: "date_valid_from",
    inputType: "input",
    inputElementType: "date",
    label: "Datum vanaf",
    placeholder: "",
  },
  {
    name: "date_valid_up_including",
    inputType: "input",
    inputElementType: "date",
    label: "Datum tot en met",
    placeholder: "",
  },
  {
    name: "amount",
    inputType: "input",
    inputElementType: "number",
    label: "Bedrag",
    placeholder: "",
  },
  {
    name: "payment_term",
    inputType: "select",
    label: "Termijn",
    placeholder: "Selecteer een categorie",
    selectOptions: [],
  },
  {
    name: "category",
    inputType: "select", // Changing the inputType to 'select' for the category field
    label: "Categorie",
    placeholder: "Selecteer een categorie",
    selectOptions: [],
  },
  {
    name: "description",
    inputType: "input",
    inputElementType: "text",
    label: "Beschrijving",
    placeholder: "",
  },
]);
await updateFieldOptions(
  TransactionPlannedFields,
  "cashflow/transaction-payment-term-list",
  "payment_term",
  "id",
  "payment_term_name_dutch"
)
  .then((updatedFields) => {
    // Optionally, you can use the updatedFields here if needed
    console.log("Updated TransactionPlannedFields:", updatedFields);
  })
  .catch((error) => {
    console.error("Error updating TransactionPlannedFields:", error);
  });

await updateFieldOptions(
  TransactionPlannedFields,
  "cashflow/transaction-category-list",
  "category",
  "id",
  "category_name"
)
  .then((updatedFields) => {
    // Optionally, you can use the updatedFields here if needed
    console.log("Updated TransactionPlannedFields:", updatedFields);
  })
  .catch((error) => {
    console.error("Error updating TransactionPlannedFields:", error);
  });
