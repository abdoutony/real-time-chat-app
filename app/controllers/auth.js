const User = require("../models/user");
const { registerSchema, loginSchema } = require("../utils/validation-schemas");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    // data validation
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { firstname, lastname, email, password } = value;

    // check if user already registered
    const isUserRegistered = await User.findOne({ email });
    if (isUserRegistered) {
      return res.status(400).json({ msg: "User already registered" });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    return res.status(201).json({ msg: "user registred", data: savedUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // data validation
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { email, password } = value;

    // check if user exist in db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

  
  

    await user.save();
    const {password:passwordRemoved,...userWithoutPassword} = user._doc
 
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    return res.status(200).json({ msg: "user logged in", data:userWithoutPassword });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const { password, ...userWithoutPassword } = user._doc;
    res.status(200).json({ msg: "user profile", data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.logout = async (req,res)=>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          });
        
    res.json({ msg: 'Logged out successfully' });
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}