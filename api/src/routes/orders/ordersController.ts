import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createOrder(req: Request, res: Response) {
  try {
    const { order, items } = req.cleanBody;
    const user_id = req.userId!;
    if (!user_id) {
      res.status(400).json({ message: "Invalid order data" });
      return;
    }
    const newOrder = await prisma.order.create({
      data: { userId: Number(user_id) },
    });
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));
    await prisma.orderItem.createMany({
      data: orderItems,
    });
    const newOrderItems = await prisma.orderItem.findMany({
      where: { orderId: newOrder.id },
    });

    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Invalid order data" });
  }
}

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) {
      res.status(400).json({ message: "Invalid order ID" });
      return;
    }
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderItem: true,
      },
    });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error retrieving the order" });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) {
      res.status(400).json({ message: "Invalid order ID" });
      return;
    }
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: req.cleanBody,
    });
    res.status(200).json(updatedOrder);
  } catch (e) {
    res.status(500).send(e);
  }
}
