import bcrypt from "bcryptjs";

// hash password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// compare password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
