const express = require("express");
const {
  getEvents,
  createEvent,
  getEvent,
  getParticipants,
  updateEvent,
  addParticipant,
} = require("../controllers/eventController");

const router = express.Router();

// get all events
router.get("/", getEvents);

// get a specific event by id
router.get("/:id", getEvent);

// add a new event
router.post("/", createEvent);

// update a event
router.patch("/:id", updateEvent);

// add participants for an event
router.post("/participants/:id", addParticipant);

// get participants for an event
router.get("/participants/:id", getParticipants);

module.exports = router;