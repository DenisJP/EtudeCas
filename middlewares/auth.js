const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require('../user.model');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "No token provided";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);

    // Récupérer l'utilisateur à partir de la base de données
    const user = await User.findById(decoded.id); 
    if (!user) {
      throw "User not found";
    }

    // Passer les informations complètes de l'utilisateur dans req.user
    req.user = user;

    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
