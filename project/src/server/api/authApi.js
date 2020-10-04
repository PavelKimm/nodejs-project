import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

export const register = async (req, res) => {
  try {
    const { email, password, password2 } = req.body;
    let { firstName, lastName } = req.body;

    // validation
    if (!email || !password || !password2)
      return res.status(400).json({ msg: "Not all fields have been entered!" });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long!" });

    if (password !== password2)
      return res.status(400).json({ msg: "Passwords don't match!" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with such email already exists!" });

    let displayName;
    if (firstName.trim() || lastName.trim()) {
      firstName = firstName.trim();
      lastName = lastName.trim();
      if (!firstName) displayName = lastName;
      else if (!lastName) displayName = firstName;
      else displayName = firstName + " " + lastName;
    } else displayName = email;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    console.log("account for " + savedUser.displayName + " created");
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered!" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with such email has been registered!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials!" });
    const token = jwt.sign(
      { id: user._id, displayName: user.displayName },
      process.env.JWT_SECRET
    );
    console.log({ token });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const validateJwt = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    try {
      var verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.json(false);
    }
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getCurrentUserData = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    displayName: user.displayName,
  });
};
