import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token)
      return res.status(401).json({ msg: "Invalid Authentification" });

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error)
        return res.status(401).json({ msg: "Invalid Authentification" });

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ msg: "Invalid Authentification" });
  }
};

export default authMiddleware;
