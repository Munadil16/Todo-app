import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Unauthorized access", success: false });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token", success: false });
    } else {
      console.log("Error while verifying token: ", error);
      return res
        .status(500)
        .json({
          msg: "Internal server error during authorization",
          success: false,
        });
    }
  }
};
