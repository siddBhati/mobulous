const Warehouse = require("../models/warehouse");


module.exports.createProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const warehouse = await Warehouse.findById(id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    warehouse.products.push(req.body);
    await warehouse.save();
    res.status(201).json(warehouse.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAllProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const warehouse = await Warehouse.findById(id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    res.status(200).json(warehouse.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductById = async (req, res) => {
  const { id, productId } = req.params;
  try {
    const warehouse = await Warehouse.findById(id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    const product = warehouse.products.find((prod) => prod._id == productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateProductById = async (req, res) => {
  const { id, productId } = req.params;
  try {
    const warehouse = await Warehouse.findById(id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    const productIndex = warehouse.products.findIndex(
      (prod) => prod._id == productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }
    warehouse.products[productIndex] = {
      ...warehouse.products[productIndex],
      ...req.body,
    };
    await warehouse.save();
    res.status(200).json(warehouse.products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteProductById = async (req, res) => {
  const { id, productId } = req.params;
  try {
    const warehouse = await Warehouse.findById(id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    const productIndex = warehouse.products.findIndex(
      (prod) => prod._id == productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }
    warehouse.products.splice(productIndex, 1);
    await warehouse.save();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.findProductsNearUser = async (req, res) => {
  const { longitude, latitude } = req.query;

  try {
    const warehouses = await Warehouse.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10 * 1000, // Convert kilometers to meters
        },
      },
    });

    const allProducts = warehouses.reduce((acc, warehouse) => {
      const productsWithStock = warehouse.products.filter(
        (product) => product.quantity > 0
      );
      acc.push(...productsWithStock);
      return acc;
    }, []);

    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
};
