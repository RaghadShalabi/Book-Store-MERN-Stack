import { UserModel } from "../../../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../srvices/email.js";

export const signUp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (await UserModel.findOne({ email })) {
    return next(new Error("email already exists", { cause: 409 }));
  }
  const hashPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const token = jwt.sign({ email }, process.env.CONFIRM_EMAIL_SECRET_KEY);

  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;

  const html = `<div>
          <h2>Verify email</h2>
          <p>Hi ${userName},</b><br><br>
          Your account has been created successfully!<br> 
          Please click on the following link to verify your email address.</p>
          <div>
              <a href="${link}">Confirm Email</a>
          </div>
      </div>`;

  await sendEmail(email, "confirm email", html);
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
  return res.status(201).json({
    message: "account created successfully, plz verify your email to signIn",
    user,
  });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new Error("user not found", { cause: 404 }));
  }
  if (!user.confirmEmail) {
    return next(new Error("plz confirm your email to signIn", { cause: 400 }));
  }
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return next(new Error("wrong password", { cause: 409 }));
  }
  const token = jwt.sign(
    { id: user._id, role: user.role, status: user.status },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  ); //1 hour
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role, status: user.status },
    process.env.SECRET_KEY,
    { expiresIn: 60 * 60 * 24 * 30 }
  ); // 1 month
  return res.status(200).json({ message: "success", token, refreshToken });
};

export const confirmEmail = async (req, res, next) => {
  const token = req.params.token;
  const decodedToken = jwt.verify(token, process.env.CONFIRM_EMAIL_SECRET_KEY);
  if (!decodedToken) {
    return next(new Error("invalid token", { cause: 404 }));
  }
  const user = await UserModel.findOneAndUpdate(
    { email: decodedToken.email, confirmEmail: false },
    { confirmEmail: true }
  );
  if (!user) {
    return next(
      new Error("invalid verify your email or your email is verified", {
        cause: 400,
      })
    );
  }
  return res.redirect('https://book-store-mern-stack-1-5n7y.onrender.com/signIn');
};
