// Packages
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";

import startup from "./startup.js";

// Initialise
const app = express();

// Middleware
app.use(bodyParser.json());

// Environment vars
config({ path: "../.env" });

const PORT = process.env.PORT || 8000

// Routes
import notificationRoutes from "./routes/v1/notifcations.route.js";
// Paths
app.use(`/api/v1/notifications`, notificationRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on PORT: ${PORT}`)
  startup.initialise();
});
