const jwt = require("jsonwebtoken");

const { checkWithBlacklist } = require("../routes/blacklist");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  //console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  //console.log(token);

  //console.log(checkWithBlacklist(token));

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  if (checkWithBlacklist(token))
    return res
      .status(401)
      .json({ success: false, message: "Access token is blacklisted" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.body.userId = decoded.userId;
    //console.log(req.body.userId);
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      // Token has expired
      return res.status(401).json({
        success: false,
        message: "Your session has expired. Please log in again.",
      });
    } else {
      // Other JWT validation errors
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

module.exports = { verifyToken };
