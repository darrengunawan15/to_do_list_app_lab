import Users from "../models/users.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};