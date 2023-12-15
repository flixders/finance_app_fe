import { FormField } from "../utils/formFields";
const API_BASE_URL = "http://127.0.0.1:8000/";
const jwt_endpoint = "auth/jwt/refresh/";
let refreshTokenPromise: Promise<void> | null = null;
let lastTokenRefreshTime: number = 0;
const TOKEN_REFRESH_THRESHOLD = 180000;

export const refreshJwtToken = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("jwt-refresh");
  const currentTime = Date.now();

  if (
    !refreshToken ||
    currentTime - lastTokenRefreshTime < TOKEN_REFRESH_THRESHOLD
  ) {
    return;
  }

  if (refreshTokenPromise) {
    return refreshTokenPromise; // Wait for the ongoing refresh to complete
  }

  refreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE_URL}${jwt_endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      const newAccessToken = data.access;
      localStorage.setItem("jwt", newAccessToken);

      lastTokenRefreshTime = currentTime; // Update the last refresh time
      resolve();
    } catch (error) {
      console.error("Token refresh error:", error);
      reject(error);
    } finally {
      refreshTokenPromise = null;
    }
  });

  return refreshTokenPromise;
};

export async function fetchData(
  endpoint: string,
  startDate?: string,
  endDate?: string,
  interval?: number
) {
  if (startDate && endDate) {
    endpoint += `/${startDate}/${endDate}`;
  }
  if (endDate && interval) {
    endpoint += `/${endDate}/${interval}`;
  }
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

    if (response.status === 401) {
      await refreshJwtToken();
      const newToken = localStorage.getItem("jwt");
      const refreshedResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${newToken}`,
        },
      });
      const refreshedData = await refreshedResponse.json();
      return refreshedData;
    } else {
      const data = await response.json();
      return data;
    }
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

    if (response.status === 401) {
      await refreshJwtToken();
      const newToken = localStorage.getItem("jwt");
      const refreshedResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${newToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await refreshedResponse.json();
      return data;
    }

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
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
  const url = `${API_BASE_URL}/${endpoint}/${recordId}`;
  const token = localStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (response.status === 401) {
      await refreshJwtToken();
      const newToken = localStorage.getItem("jwt");
      const refreshedResponse = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${newToken}`,
        },
      });

      if (!refreshedResponse.ok) {
        throw new Error("Network response was not ok.");
      }
    }

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
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
      localStorage.setItem("jwt", data.access);
      localStorage.setItem("jwt-refresh", data.refresh);

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

    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        error: "Registration failed. Please try again.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred. Please try again later.",
    };
  }
};
