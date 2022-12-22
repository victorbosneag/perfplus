import db from "../Models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = db.users;

export const create = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //Check emptyness of the incoming data
    if (!username || !email || !password) {
      return res.json({ message: "Please enter all the details" });
    }
    req.body["role"] = "Teacher";
    //Check if the user already exist or not
    const userExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExist) {
      return res.json({ message: "User already exist with the given emailId" });
    }
    //Hash the password
    console.log(process.env.SECRET_KEY);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const user = await User.create(req.body);
    const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.json({
      success: true,
      token: token,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check emptyness of the incoming data
    if (!email || !password) {
      return res.json({ message: "Please enter all the details" });
    }
    //Check if the user already exist or not
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res.json({ message: "Wrong credentials" });
    }
    //Check password match
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordMatched) {
      return res.json({ message: "Wrong credentials" });
    }
    const token = await jwt.sign({ id: userExist.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.json({
      success: true,
      token: token,
      message: "LoggedIn Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
};
