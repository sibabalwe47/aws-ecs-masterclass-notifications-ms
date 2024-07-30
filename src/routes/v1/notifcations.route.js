import express from "express";
import NotificationsController from "../../controllers/notifications.controller.js";
const route = express.Router();

route.post("/send", NotificationsController.sendNotification);

route.get("/health", NotificationsController.healthCheck)

export default route;
