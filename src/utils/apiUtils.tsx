import { FormField } from "../utils/formFields";
const API_BASE_URL = "http://127.0.0.1:8000/";

export async function fetchData(endpoint: string) {
  const url = `${API_BASE_URL}/${endpoint}`;
  const token = localStorage.getItem("jwt");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    console.log("Data retrieved:", data);
    return data;
  } catch (error) {
    console.error("There was an error fetching data:", error);
    return null;
  }
}

export async function fetchDataAndUpdateState<T>(
  endpoint: string,
  setStateFunction: React.Dispatch<React.SetStateAction<T>>
): Promise<void> {
  try {
    const data: { error?: string; results?: T } = await fetchData(endpoint);
    if (data.error) {
      console.error("Error fetching data:", data.error);
    } else {
      setStateFunction(data.results!);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const submitFormData = async (
  formData: Record<string, unknown>,
  endpoint: string
): Promise<any> => {
  const url = `${API_BASE_URL}/${endpoint}/`;
  const token = localStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log("Data received from API:", data);
    return data;
  } catch (error) {
    console.error("There was an error:", error);
    throw error;
  }
};

export const deleteRecord = async (
  recordId: number,
  endpoint: string
): Promise<any> => {
  const url = `${API_BASE_URL}/${endpoint}/${recordId}`; // Assuming endpoint includes the resource path

  const token = localStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    console.log("Record deleted from database");
  } catch (error) {
    console.error("There was an error:", error);
    throw error;
  }
};

interface Identifier {
  id: string;
  label: string;
}
export async function updateFieldOptions(
  fields: FormField[],
  endpoint: string,
  fieldName: string,
  idIdentifier: string,
  labelIdentifier: string
): Promise<FormField[]> {
  try {
    const data: Identifier[] = await fetchData(endpoint);

    const fieldToUpdate = fields.find((field) => field.name === fieldName);
    if (fieldToUpdate && fieldToUpdate.inputType === "select" && data) {
      fieldToUpdate.selectOptions = data.map((item: Identifier) => ({
        value: item[idIdentifier as keyof Identifier],
        label: item[labelIdentifier as keyof Identifier],
      }));
    } else {
      console.error(`Field '${fieldName}' not found or not a select input.`);
    }
  } catch (error) {
    console.error("Error updating field options:", error);
  }

  return fields;
}

// apiUtils.ts
export interface LoginResponse {
  success: boolean;
  error?: string;
}
export const loginUser = async (
  username: string,
  password: string,
  endpoint: string
): Promise<LoginResponse> => {
  // auth/jwt/create
  const url = `${API_BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url, {
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
      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid credentials. Please try again.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while logging in. Please try again later.",
    };
  }
};

export interface RegistrationResponse {
  success: boolean;
  error?: string;
}
export const registerUser = async (
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string,
  endpoint: string
): Promise<RegistrationResponse> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
    });
    console.log(
      JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      })
    );

    if (response.ok) {
      const data = await response.json();
      const jwt = data.access;
      localStorage.setItem("jwt", jwt);
      return { success: true };
    } else {
      const data = await response.json();
      if (data && data.detail) {
        return { success: false, error: data.detail };
      } else {
        return {
          success: false,
          error: "Registration failed. Please try again.",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred. Please try again later.",
    };
  }
};

export async function fetchBudgetOverview(
  startDate?: string,
  endDate?: string
) {
  let endpoint = "cashflow/calculations/budget-overview";

  // Append start_date and end_date only if provided
  if (startDate && endDate) {
    endpoint += `/${startDate}/${endDate}`;
  }

  const token = localStorage.getItem("jwt");

  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    console.log("Data retrieved:", data);
    return data;
  } catch (error) {
    console.error("There was an error fetching budget overview data:", error);
    return null;
  }
}

export async function fetchSpendingVarOverview(
  startDate?: string,
  endDate?: string
) {
  const token = localStorage.getItem("jwt");

  let endpoint = "cashflow/calculations/spending-variable/";
  if (startDate && endDate) {
    endpoint += `${startDate}/${endDate}`;
  }

  const url = `${API_BASE_URL}/${endpoint}`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    console.log("Data retrieved:", data);
    return data;
  } catch (error) {
    console.error("There was an error fetching budget overview data:", error);
    return null;
  }
}
