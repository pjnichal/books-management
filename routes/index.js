import express from "express";
import authRoutes from "./authRoutes.js";
import booksRoutes from "./booksRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import searchRoutes from "./searchRoute.js";

const router = express.Router();

router.get("/", (req, res) => {
  const response = {
    status: "success",
    data: null,
    message: "Server status: up and running.",
  };
  return res.status(200).json(response);
});

router.use("/auth", authRoutes);
router.use("/books", booksRoutes);
router.use("/reviews", reviewRoutes);
router.use("/search", searchRoutes);

export default router;
