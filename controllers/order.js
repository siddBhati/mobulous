const Order = require('../models/orders');

module.exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.updateOrderById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['price', 'products']; 
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.approveOrRejectOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!status || (status !== 'approved' && status !== 'rejected')) {
        return res.status(400).send({ error: 'Invalid status provided' });
      }
  
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!order) {
        return res.status(404).send({ error: 'Order not found' });
      }
  
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  };