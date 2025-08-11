import jwt from "jsonwebtoken";
import { errorHandler } from "../Helper/errorHandler.js";
export const Authenticated = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    const decodeuser = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decodeuser)
    req.user = decodeuser;
    next();
  } catch (error) {
    next(errorHandler(401,'Unauthorized'));
  }
};
