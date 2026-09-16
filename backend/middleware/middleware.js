const requireAuth = async (req, res, next) => {
    try {
        const sessionToken =
            req.headers["x-parse-session-token"];

        // console.log("Session Token:", sessionToken);

        if (!sessionToken) {
            return res.status(401).json({
                message: "Login required"
            });
        }

        const response = await fetch(
            `${process.env.PARSE_SERVER_URL}/users/me`,
            {
                method: "GET",
                headers: {
                    "X-Parse-Application-Id":
                        process.env.PARSE_APP_ID,

                    "X-Parse-Session-Token":
                        sessionToken
                }
            }
        );

        const data = await response.json();

        // console.log("Parse /users/me:", response.status, data);

        if (!response.ok) {
            return res.status(401).json({
                message: "Invalid session"
            });
        }

        req.user = data;

        next();

    } catch (error) {
        console.error("Auth error:", error);

        return res.status(401).json({
            message: "Invalid session"
        });
    }
};

module.exports = {
    requireAuth
};