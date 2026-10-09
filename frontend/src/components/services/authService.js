const API_URL = "http://localhost:1337/api/auth";

export const signupuser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const loginuser = async (userData) => {
  try {
    const respnse = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await respnse.json();
    if (!respnse.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


export const getCurrentUser = async (token) => {

    const response = await fetch(
        `${API_URL}/me`,
        {
            method: "GET",

            headers: {
                "x-parse-session-token": token
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};


export const logoutUser = async (sessionToken) => {
    const response = await fetch(
        `${API_URL}/logout`,
        {
            method: "POST",
            headers: {
                "x-parse-session-token": sessionToken
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Logout failed"
        );
    }

    return data;
};
