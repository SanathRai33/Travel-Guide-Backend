const UserSchema = require("../model/user");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'userKey';//What we want

const Insert = async (req, res) => {
  try {
    const { name, email, password, gender, phone, city, country  } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    const user = new UserSchema({
      name:name,
      gender: gender,
      email:email,
      phone: phone,
      password: secPass,
      city: city,
      country: country,
    });

    const saveuser = await user.save();

    res.send(saveuser);
  } catch (error) {
    console.log(error);
  }
};

const UserLogin = async (req, res) => {
  try {
    let success = false;

    const { name, email, password } = req.body;

    let user = await UserSchema.findOne({ email, name });
    if (!user) {
      success = false;
      return res.status(400).json({ msg: "Invalid Credential" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password);

    if (!passwordcompare) {
      success = false;
      return res.json({
        success,
        error: "Try to login with correct credentials",
      });
    }

    const data = user.id;
    const authtoken = jwt.sign(data, JWT_SECRET);

    success = true;

    res.json({ success, authtoken });
    console.log(authtoken);

  } catch (error) {
    console.log(error);
  }
};

module.exports = { Insert, UserLogin };