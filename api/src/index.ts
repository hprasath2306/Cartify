import express, { urlencoded } from "express";
import productsRoutes from "./routes/products/index";
import authRoutes from "./routes/auth/index";

const app = express();
app.use(urlencoded({ extended: false }));
app.use(express.json());

//endpoints
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("Server is Ready!!");
});

if (process.env.NODE_ENV === "dev") {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

