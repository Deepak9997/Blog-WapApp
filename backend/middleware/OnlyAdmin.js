import jwt from "jsonwebtoken";
import { errorHandler } from "../Helper/errorHandler.js"; 

export const OnlyAdmin = (req, res, next) => {
  try {
    const token = req.coockies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    const DecodeUser = jwt.verify(token, process.env.SECRET_KEY);
    if(DecodeUser.role === 'Admin'){
        req.user = DecodeUser;
        next();
    }else{
        return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(errorHandler(401, "Unauthorized"));
  }
};
