const { Parse } = require("../config/parse");

// ============================
// SIGNUP
// ============================
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }

        // Create Parse User
        const user = new Parse.User();

        user.set("username", username);
        user.set("email", email);
        user.set("password", password);

        // Save user in Parse
        const newUser = await user.signUp();

        return res.status(201).json({
            message: "Signup successful",
            user: {
                id: newUser.id,
                username: newUser.get("username"),
                email: newUser.get("email")
            }
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(400).json({
            message: error.message
        });
    }
};


// ============================
// LOGIN
// ============================
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        // Login user
        const user = await Parse.User.logIn(
            username,
            password
        );

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.get("username"),
                email: user.get("email")
            },
            sessionToken: user.getSessionToken()
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(401).json({
            message: error.message
        });
    }
};


// ============================
// CURRENT USER
// ============================
const currentUser = async (req, res) => {
    try {
        const sessionToken =
            req.headers["x-parse-session-token"];

        if (!sessionToken) {
            return res.status(401).json({
                message: "Session token is required"
            });
        }

        const user =
            await Parse.User.become(sessionToken);

        return res.status(200).json({
            user: {
                id: user.id,
                username: user.get("username"),
                email: user.get("email")
            }
        });

    } catch (error) {
        console.error("Current user error:", error);

        return res.status(401).json({
            message: "Invalid or expired session"
        });
    }
};


// ============================
// LOGOUT
// ============================
const logout = async (req, res) => {
    try {
        const sessionToken =
            req.headers["x-parse-session-token"];

        if (!sessionToken) {
            return res.status(400).json({
                message: "Session token is required"
            });
        }

        const response = await fetch(
            `${process.env.PARSE_SERVER_URL}/logout`,
            {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id":
                        process.env.PARSE_APP_ID,

                    "X-Parse-Session-Token":
                        sessionToken
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                message: data.error || "Logout failed"
            });
        }

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    signup,
    login,
    currentUser,
    logout
};