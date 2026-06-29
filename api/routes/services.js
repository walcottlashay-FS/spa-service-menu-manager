const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const protect = require("../middleware/authMiddleware");

// Service routes below are protected.
// A user must be logged in and send a valid token before using CRUD.

// GET all services
router.get("/", protect, async (req, res) => {
  try {
    const services = await Service.find().sort({ created_at: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new service
router.post("/", protect, async (req, res) => {
  try {
    const service = new Service({
      serviceName: req.body.serviceName,
      category: req.body.category,
      price: req.body.price,
    });

    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update a service
router.patch("/:id", protect, async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a service
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

