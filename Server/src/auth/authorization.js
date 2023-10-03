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

const isAdmin = () => {
  return (req, res, next) => {
    const authHeader = req.headers["type"];
    if (authHeader) {
      if (authHeader === "Admin") {
        return next();
      } else {
        return res.status(403).send({
          status: 403,
          message: "Forbidden",
          description: "Permission Denied",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "Invalid Request",
        description: "Header Missing",
      });
    }
  };
};

const isStaff = () => {
  return (req, res, next) => {
    const authHeader = req.headers["type"];
    if (authHeader) {
      if (authHeader === "Staff") {
        return next();
      } else {
        return res.status(403).send({
          status: 403,
          message: "Forbidden",
          description: "Permission Denied",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "Invalid Request",
        description: "Header Missing",
      });
    }
  };
};

const isStudent = () => {
  return (req, res, next) => {
    const authHeader = req.headers["type"];
    if (authHeader) {
      if (authHeader === "Student") {
        return next();
      } else {
        return res.status(403).send({
          status: 403,
          message: "Forbidden",
          description: "Permission Denied",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "Invalid Request",
        description: "Header Missing",
      });
    }
  };
};

const isAdminAndStaff = () => {
  return (req, res, next) => {
    const authHeader = req.headers["type"];
    if (authHeader) {
      if (authHeader === "Admin" || authHeader === "Staff") {
        return next();
      } else {
        return res.status(403).send({
          status: 403,
          message: "Forbidden",
          description: "Permission Denied",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "Invalid Request",
        description: "Header Missing",
      });
    }
  };
};

const isAdminAndStudent = () => {
  return (req, res, next) => {
    const authHeader = req.headers["type"];
    if (authHeader) {
      if (authHeader === "Admin" || authHeader === "Student") {
        return next();
      } else {
        return res.status(403).send({
          status: 403,
          message: "Forbidden",
          description: "Permission Denied",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "Invalid Request",
        description: "Header Missing",
      });
    }
  };
};

const isStaffAndStudent = () => {
  return (req, res, next) => {
    const authHeader = req.headers["type"];
    if (authHeader) {
      if (authHeader === "Staff" || authHeader === "Student") {
        return next();
      } else {
        return res.status(403).send({
          status: 403,
          message: "Forbidden",
          description: "Permission Denied",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "Invalid Request",
        description: "Header Missing",
      });
    }
  };
};

module.exports = {
  validateToken,
  isAdmin,
  isStaff,
  isStudent,
  isAdminAndStaff,
  isAdminAndStudent,
  isStaffAndStudent,
};
