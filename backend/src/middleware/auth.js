import jwt from "jsonwebtoken";
import {UserModel} from "../../DB/models/User.model.js";
import { asyncHandler } from "./errorHandling.js";


export const auth = asyncHandler(
    async (req, res, next) => {
        const { authorization } = req.headers;

        // التحقق من وجود التوكن في الهيدر
        if (!authorization?.startsWith(process.env.BEARER_TOKEN)) {
            return res.status(409).json({ message: "Invalid authorization" });
        }

        // استخراج التوكن من الهيدر
        const token = authorization.split(process.env.BEARER_TOKEN)[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // التحقق من صحة التوكن
        if (!decodedToken) {
            return res.status(400).json({ message: "Invalid authorization" });
        }

        // البحث عن المستخدم بناءً على الـ ID في التوكن
        const user = await UserModel
            .findById({ _id: decodedToken.id })
            .select("userName email changePasswordTime");

        // التحقق من وجود المستخدم
        if (!user) {
            return res.status(404).json({ message: "User registered not found" });
        }

        // التحقق إذا كان المستخدم قد غير كلمة المرور مؤخرًا
        if (parseInt(user.changePasswordTime?.getTime() / 1000) > decodedToken.iat) {
            return next(new Error("User changed password, please login", { cause: 400 }));
        }

        // إضافة المستخدم إلى الكائن req للرجوع إليها في المستقبل
        req.user = user;

        // المتابعة إلى الـ next middleware
        next();
    })