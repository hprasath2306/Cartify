import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import { loginSchema, userSchema } from "../../schemas/schemas";
import bcrypt from "bcryptjs";
import prisma from "../../db/client";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", validateData(userSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    const { password, ...userWithoutPassword } = user;
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (e: any) {
    console.error(e);
    if (e.code === "P2002") {
      res.status(409).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Authentication failed" });
      } else {
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET!,
          {
            expiresIn: "1h",
          }
        );
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({
          message: "Login successful",
          user: userWithoutPassword,
          token,
        });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
