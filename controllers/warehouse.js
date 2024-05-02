const Warehouse = require('../models/warehouse');

module.exports.createWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.create(req.body);
        res.status(201).json(warehouse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.status(200).json(warehouses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }
        res.status(200).json(warehouse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.updateWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!warehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }
        res.status(200).json(warehouse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


