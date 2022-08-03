const express = require("express");
const {
  getEvents,
  createEvent,
  getEvent,
  getParticipants,
  updateEvent,
  addParticipant,
  uploadEventImage,
  getEventImage,
  checkConflictingEvents,
  getUpcomingEvents,
  removeParticipant,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const multer = require("multer");
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// get all events
router.get("/", getEvents);

// get upcoming events
router.get("/upcoming-events", getUpcomingEvents);

// get a specific event by id
router.get("/:id", getEvent);

// add a new event
router.post("/", protect, createEvent);

// check for conflicting events
router.post("/check-conflicts", protect, checkConflictingEvents);

// add image to event
router.post("/image", protect, upload.single("img"), uploadEventImage);

// get image for an event
router.get("/image/:id", getEventImage);

// update a event
router.patch("/:id", protect, updateEvent);

// add participants for an event
router.post("/participants/:id", protect, addParticipant);

// remove participant
router.delete("/participants/:id", protect, removeParticipant);

// get participants for an event
router.get("/participants/:id", protect, getParticipants);

module.exports = router;
