import { Router } from "express";
import { createOrder, getOrderById, listOrders, updateOrder } from "./ordersController";
import { validateData } from "../../middlewares/validationMiddleware";
import { insertOrderWithItemsSchema, orderSchema, updateOrderSchema } from "../../schemas/schemas";
import { verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);
router.get("/", verifyToken, listOrders);
router.get("/:id", verifyToken, getOrderById);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder)

export default router;
