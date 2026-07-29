import express from "express";

import {
getHomeSettings,
updateHomeSettings
} from "../controllers/homeController.js";

const router = express.Router();



router.get(
"/",
getHomeSettings
);



router.put(
"/",
updateHomeSettings
);



export default router;