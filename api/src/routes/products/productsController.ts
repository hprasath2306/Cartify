import { Request, Response } from "express";
import prisma from "../../db/client";
import _ from 'lodash';


export async function listProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany();
    if (products.length === 0) {
      res.status(404).json({ message: "No products found" });
    } else {
      res.status(200).json(products);
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "Invalid product ID" });
    } else {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the product" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    console.log(req.userId)
    const newProduct = req.cleanBody;
    if (!newProduct || !newProduct.name || !newProduct.price) {
      res.status(400).json({ message: "Product name and price are required" });
    } else {
      const product = await prisma.product.create({
        data: newProduct,
      });
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const updatedData = req.body;
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "Invalid product ID" });
    } else {
      const existingProduct = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
      if (!existingProduct) {
        res.status(404).json({ message: "Product not found" });
      } else {
        const updatedProduct = await prisma.product.update({
          where: { id: Number(id) },
          data: updatedData,
        });
        res.status(200).json({
          message: "Product updated successfully",
          product: updatedProduct,
        });
      }
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
    } else {
      await prisma.product.delete({
        where: { id: Number(id) },
      });

      res.status(204).send();
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
}
