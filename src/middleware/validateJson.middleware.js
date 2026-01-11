const validateJson = (req, res, next) => {
  // Only validate methods that send body
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Invalid or empty JSON body"
      });
    }
  }
  next();
};

module.exports = validateJson;
