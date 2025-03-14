const sql = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("email and password required");
  }

  const user = await sql`
    SELECT users.first_name , users.email,users.password , role.name  as role
    FROM users 
    JOIN role ON users.role_id = role.id 
    WHERE users.email = ${req.body.email}
    ;`;
  console.log(user);
  if (user.length == 0) {
    res.status(400);
    throw new Error("User not found");
  }
  console.log(user[0].password);
  // const match = await bcrypt.compare(req.body.password, user[0].password);
  const match = user[0].password === req.body.password;
  if (!match) {
    res.status(400);
    throw new Error("Invalid password");
  }
  const jwtToken = generatejsonWebToken(user[0]);

  res.status(200);
  res.send({ 
    status: "success", 
    token: jwtToken,
    role: user[0].role // Include the role in the response
  });
});

const generatejsonWebToken = (data) => {
  const { password, ...userData } = data;
  console.log(userData);
  const token = jwt.sign(
    { userData },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token will expire in 1 hour
  );
  return token;
};

const updateUserData = async (req, res) => {
  const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
  const hashedPassword = await bcrypt.hash("123", salt);
  const result = await sql`
    UPDATE "users" 
    SET password = ${hashedPassword}
    WHERE id = 1
  `;

  console.log(result);
  res.status(200);
  res.send({ message: result });
};

const getUsers = asyncHandler(async (req, res) => {
  const users = await sql`select * from "users"`;
  if (users.length === 0) {
    res.status(200);
    throw new Error("No users in the database");
  }
  res.status(200);
  res.json({ users });
});

const createUser = asyncHandler(async (req, res) => {
  const { email, firstname, familyname, password } = req.body;

  if (!email || !firstname || !familyname || !password) {
    res.status(400);
    res.json({
      status: "failure",
      message: "email , firstname , familyname , password required",
    });
  }
});

module.exports = { login, updateUserData, getUsers };
