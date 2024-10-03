const express = require("express");
const ToolModel = require("../model/tools"); // Adjust the path as necessary
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const imageDownloader = require("image-downloader");
const booking = require("../model/bookings");
const BookingModel = require("../model/bookings");

const router = express.Router();

// File upload middleware
const photosMiddleware = multer({ dest: "uploads/" });

// Route to upload an image by link

router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  // Use path.join to ensure the correct path to the uploads directory
  const uploadPath = path.join(__dirname, "../uploads", newName);

  try {
    await imageDownloader.image({
      url: link,
      dest: uploadPath, // Ensure it resolves to the correct path
    });
    res.json(newName);
  } catch (error) {
    console.error("Error downloading the image:", error);
    res.status(500).json({ message: "Image download failed." });
  }
});

// Route to upload multiple photos
router.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

// Route to create a new tool
router.post("/tools", async (req, res) => {
  try {
    const {
      tool_title,
      tool_photos,
      tool_description,
      tool_perks,
      tool_price,
      tool_maxDays,
    } = req.body;
    const toolDoc = await ToolModel.create({
      tool_title,
      tool_photos,
      tool_description,
      tool_perks,
      tool_price,
      tool_maxDays,
    });
    res.status(201).json(toolDoc);
  } catch (error) {
    console.error("Error creating tool:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch all tools
router.get("/tools", async (req, res) => {
  try {
    const tools = await ToolModel.find();
    res.status(200).json(tools);
  } catch (error) {
    console.error("Error fetching tools:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/booking", (req, res) => {
  const { tool, rentFrom, rentTo, rentName, rentMobile, rentPrice } = req.body;
  booking
    .create({
      tool,
      rentFrom,
      rentTo,
      rentName,
      rentMobile,
      rentPrice,
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch(() => {
      throw err;
    });
});

router.get("/booking", async (req, res) => {
  try {
    const booking = await BookingModel.find().populate("tool");
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching bookings", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch a tool by ID
router.get("/tools/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await ToolModel.findById(id));
});

// Route to update a tool
router.put("/tools/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tool_title,
      tool_photos,
      tool_description,
      tool_perks,
      tool_price,
      tool_maxDays,
    } = req.body;
    const toolDoc = await ToolModel.findById(id);
    if (!toolDoc) {
      return res.status(404).json({ message: "Tool not found" });
    }
    toolDoc.tool_title = tool_title;
    toolDoc.tool_photos = tool_photos;
    toolDoc.tool_description = tool_description;
    toolDoc.tool_perks = tool_perks;
    toolDoc.tool_price = tool_price;
    toolDoc.tool_maxDays = tool_maxDays;
    await toolDoc.save();
    res.json({ message: "Tool updated successfully" });
  } catch (error) {
    console.error("Error updating tool:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
