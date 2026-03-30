import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

// generate token
export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

// verify token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};

export const getUserFromRequest = (req) => {
  try {
    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization");

    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];

    if (!token) return null;

    return verifyToken(token); 
  } catch {
    return null;
  }
};

// // get user from middleware header
// export const getUserFromRequest = (req) => {
//   try {
//     const user = req.headers.get("user");
//     return user ? JSON.parse(user) : null;
//   } catch {
//     return null;
//   }
// };
