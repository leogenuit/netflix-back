const isAdmin = (req, res, next) => {
  try {
    if (req.currentUser?._doc.isAdmin) {
      return next();
    }

    return res.status(403).json({ message: "You are not Admin" });
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
