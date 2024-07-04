const role = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else res.sendStatus(401);
  };
};

module.exports = role;
