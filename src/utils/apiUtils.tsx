const API_BASE_URL = "http://127.0.0.1:8000/"; // Your base URL

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
