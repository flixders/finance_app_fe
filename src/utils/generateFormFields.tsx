export interface FormField {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}
export const generateFormFields = (fields: FormField[]): FormField[] => {
  return fields;
};
