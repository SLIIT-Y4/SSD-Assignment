const validateToken = () => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
      if (token === process.env.API_TOKEN) {
        return next();
      } else {
        return res.status(403).send({
          status: 403,
          message: "Unauthorized",
          description: "Invalid Token",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "Invalid Request",
        description: "Authorization Header Missing",
      });
    }
  };
};

module.exports = {
  validateToken,
};
