const AdminSchema = require("../model/admin");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'adminKey';//What we want

const Insert = async (req, res) => {
  try {
    const { name, email, password, phone  } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    const admin = new AdminSchema({
      name:name,
      email:email,
      phone: phone,
      password: secPass,
    });

    const saveadmin = await admin.save();

    res.send(saveadmin);
  } catch (error) {
    console.log(error);
  }
};

const AdminView = async (req, res) => {
    try {
      const data = await AdminSchema.find();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const AdminLogin = async (req, res) => {
    try {
      let success = false;
      const { name, email, password } = req.body;
  
      let admin = await AdminSchema.findOne({ email, name });
      if (!admin) {
        return res.status(400).json({ success: false, error: "Invalid Credential" });
      }
  
      const passwordcompare = await bcrypt.compare(password, admin.password);
      if (!passwordcompare) {
        return res.status(400).json({ 
          success: false, 
          error: "Try to login with correct credentials" 
        });
      }
  
      const payload = {
        admin: {
          id: admin.id
        }
      };
      
      const authtoken = jwt.sign(payload, JWT_SECRET);
      res.json({ success: true, authtoken });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };

const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await AdminSchema.findById(id);

    if (!data) {
      console.log("Data not found with this ID");
      return res.status(404).send("Data does not exist with this ID");
    } else {
      data = await AdminSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, "Deleted Data": data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Some internal error!");
  }
};

module.exports = { Insert, AdminLogin, AdminView, Delete };