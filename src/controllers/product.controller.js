import {
  getAllProducts,
  getProductByID,
  createProduct,
} from "../services/product.services.js";

export const fetchProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const fetchProduct = async (req, res) => {
  try {
    const product = await getProductByID(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User ID missing from token" });
    }

    const product = await createProduct({
      name,
      description,
      price,
      stock,
      userId,
    });

    res.status(201).json({ message: "product added", product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create product" });
  }
};
